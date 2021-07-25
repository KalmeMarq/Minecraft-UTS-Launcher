import axios from 'axios'
import { exec } from 'child_process'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import log from 'electron-log'
import { existsSync, readFileSync, writeFileSync } from 'original-fs'
import path from 'path'
import UrlKnown from '../common/UrlKnown'
import LauncherConfiguration from './LauncherConfiguration'
import Paths from './Paths'

interface IAppxInfo {
  Name: string,
  Publisher: string,
  Architecture: string,
  ResourceId: string,
  Version: string,
  PackageFullName: string,
  InstallLocation: string,
  IsFramework: string,
  PackageFamilyName: string,
  PublisherId: string,
  IsResourcePackage: string,
  IsBundle: string,
  IsDevelopmentMode: string,
  NonRemovable: string,
  Dependencies: string,
  IsPartiallyStaged: string,
  SignatureKind: string,
  Status: string
}

class Main {
  public static winURL = `http://localhost:9080`
  public static mainWindow: BrowserWindow
  public static loadingWindow: BrowserWindow | undefined
  public static firstMove: boolean = true
  public static secondMove: boolean = true

  public static main(): void {
    // Application Data directory: ...\.minecraft

    writeFileSync(Paths.launcherLog, '')
    log.transports.file.resolvePath = () => Paths.launcherLog;

    log.info('Data directory:', '...' + Paths.dataDirectory.substring(Paths.dataDirectory.lastIndexOf('/'), Paths.dataDirectory.length))
    log.info('Launcher app cache directory:', '...' + Paths.launcherAppCache.substring(Paths.launcherAppCache.lastIndexOf('/'), Paths.launcherAppCache.length))
    app.setPath('userData', Paths.launcherAppCache)
    
    LauncherConfiguration.load(Paths.launcherSettings)

    app.on('ready', (): void => {
      Main.createWindow()

      ipcMain.on('mcutsl:launchBugrock', async() => {
        Main.launchBugrock()
      })
    })
    
    app.on('activate', () => {
      if(BrowserWindow.getAllWindows().length === 0) {
        Main.createWindow()
      }
    })
    
    app.on('window-all-closed', function () {
      if(process.platform !== 'darwin') {
        app.quit()
      }
    })
  }

  public static async createWindow(): Promise<void> {
    await this.ensureOk()
    this.mainWindow = new BrowserWindow(Object.assign({
      width: LauncherConfiguration.width,
      minWidth: 1000,
      height: LauncherConfiguration.height,
      minHeight: 580,
      title: LauncherConfiguration.title,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false
      }
    },
    (LauncherConfiguration.x !== -1 && LauncherConfiguration.y -1) && {
      x: LauncherConfiguration.x,
      y: LauncherConfiguration.y
    }
    ))

    this.mainWindow.webContents.setWindowOpenHandler(({url}) => {
      shell.openExternal(url)
      return { action: 'deny' };
    })

    this.mainWindow.on('resize', () => {
      let size = this.mainWindow.getSize()
      LauncherConfiguration.width = size[0]
      LauncherConfiguration.height = size[1]
      LauncherConfiguration.save(Paths.launcherSettings)
    })

    this.mainWindow.on('moved', () => {
      let offset = this.mainWindow.getPosition()
      LauncherConfiguration.x = offset[0]
      LauncherConfiguration.y = offset[1]
      LauncherConfiguration.save(Paths.launcherSettings)
    })

    if(process.env.NODE_ENV === 'development') {
      this.mainWindow.loadURL(Main.winURL)
    } else {
      this.mainWindow.loadFile('./dist/index.html')
    }

    this.mainWindow.removeMenu()
  }

  private static launchBugrock(): void {
    log.info('Minecraft Bugrock Launched!')
    exec("explorer.exe shell:appsFolder\\Microsoft.MinecraftUWP_8wekyb3d8bbwe!App", (stdout, stderr) => {
      this.mainWindow.webContents.send('mcutsl:killedBugrock')
      log.log('Bugrock killed')
      log.log(stdout)
      log.log(stderr)
    })
  }

  private static async getAppxPackage(): Promise<IAppxInfo> {
    let c: IAppxInfo = {
      Name: '',
      Publisher: '',
      Architecture: '',
      ResourceId: '',
      Version: '',
      PackageFullName: '',
      InstallLocation: '',
      IsFramework: '',
      PackageFamilyName: '',
      PublisherId: '',
      IsResourcePackage: '',
      IsBundle: '',
      IsDevelopmentMode: '',
      NonRemovable: '',
      Dependencies: '',
      IsPartiallyStaged: '',
      SignatureKind: '',
      Status: ''
    }

    await new Promise<void>((resolve, reject) => {
      exec('Get-AppxPackage -Name Microsoft.MinecraftUWP', {'shell':'powershell.exe'}, (error: any, stdout: any, stderr: any)=> {
        console.log('error: ' + error);
        let a = stdout
        let b: any[] = a.split(/\r\n|\r|\n/g)
        b = b.filter(v => v !== '')
        
      
        b.map(v => {
          let n: any = v.split(':') 
          n = n.map((m: string) => m.trim())
          let p: 'Name' | 'Publisher' | 'Architecture' | 'ResourceId' | 'Version' | 'PackageFullName' | 'InstallLocation' | 'IsFramework' | 'PackageFamilyName' | 'PublisherId' | 'IsResourcePackage' | 'IsBundle' | 'IsDevelopmentMode' | 'NonRemovable' | 'Dependencies' | 'IsPartiallyStaged' | 'SignatureKind' | 'Status' = n[0]
          c[p] = n[1]
        })
        resolve()
      })
    })

    return c
  }

  public static async addAppxPackage(path: string): Promise<void> {
    await new Promise((resolve, reject) => {
      exec(`Add-AppxPackage -Register ${path}`)
    })
  }

  public static async removeAppxPackage(packageName: string): Promise<void> {
    await new Promise((resolve, reject) => {
      exec(`Remove-AppxPackage -Package ${packageName}`, {'shell':'powershell.exe'}, (error: any, stdout: any, stderr: any)=> {
      })
    })
  }

  public static async ensureOk(): Promise<void> {
    async function ensureExistance() {
      if(!existsSync(Paths.javaVersionManifest)) {
        let manifest = JSON.stringify(await (await axios.get(UrlKnown.javaVersionsV2)).data)
        writeFileSync(Paths.javaVersionManifest, manifest)
      }
      if(!existsSync(Paths.bugrockVersionManifest)) {
        let base = JSON.parse(JSON.stringify(await (await axios.get(UrlKnown.bugrockVersions)).data))
        let manifest: { lastest: { official: string, beta: string }, versions: { id: string, type: 'official' | 'beta', uuid: string }[] } = {
          lastest: {
            official: '',
            beta: ''
          },
          versions: []
        }
        base.map((v: any) => {
          manifest.versions.push({
            id: v[0],
            type: v[2] === 1 ? 'beta' : 'official',
            uuid: v[1]
          })
        })
        let lO = ''
        let lB = ''
        for(let i = manifest.versions.length - 1; i > 0; --i) {
          if(lO === '' || lB === '') {
            if(lO === '' && manifest.versions[i].type === 'official') {
              lO = manifest.versions[i].id
            }
            if(lB === '' && manifest.versions[i].type === 'beta') {
              lB = manifest.versions[i].id
            }
          } else break;
        }       
        manifest.lastest.official = lO
        manifest.lastest.beta = lB
        writeFileSync(Paths.bugrockVersionManifest, JSON.stringify(manifest, null, 2))
      }

      if(!existsSync(Paths.launcherProfiles)) {
        writeFileSync(Paths.launcherProfiles, '{}')
      } else {
        writeFileSync(Paths.launcherAccounts, JSON.stringify(JSON.parse(readFileSync(Paths.launcherAccounts).toString('utf-8')), null, 2))
      }
    }
    await ensureExistance()
  }

  public static isRunning(query: any, cb: any) {
    let cmd = '';
    switch(process.platform) {
      case 'win32' : cmd = `tasklist`; break;
      case 'darwin' : cmd = `ps -ax | grep ${query}`; break;
      case 'linux' : cmd = `ps -A`; break;
      default: break;
    }
    exec(cmd, (err: any, stdout: any, stderr: any) => {
      cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
  }
}

Main.main()