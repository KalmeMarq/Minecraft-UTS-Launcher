import { exec } from 'child_process'
import { app, BrowserWindow, ipcMain } from 'electron'
import log from 'electron-log'
import { writeFileSync } from 'original-fs'
import path from 'path'

class Main {
  public static winURL = `http://localhost:9080`
  public static mainWindow: BrowserWindow
  public static loadingWindow: BrowserWindow | undefined
  public static firstMove: boolean = true
  public static secondMove: boolean = true

  public static main(): void {
    app.setPath('userData', process.env.APPDATA + '\\.minecraft_uts\\webcache\\')
    writeFileSync(process.env.APPDATA + '\\.minecraft_uts\\launcher_log.txt', '')
    log.transports.file.resolvePath = () => process.env.APPDATA + '\\.minecraft_uts\\launcher_log.txt';

    app.on('ready', (): void => {
      Main.createWindow()

      ipcMain.on('mcutsl:launchBugrock', () => {
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

  public static createWindow(): void {
    this.mainWindow = new BrowserWindow({
      width: 1000,
      minWidth: 1000,
      height: 600,
      minHeight: 600,
      title: 'Minecraft UTS Launcher',
      center: true,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: false
      }
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
    exec("explorer.exe shell:appsFolder\\Microsoft.MinecraftUWP_8wekyb3d8bbwe!App")
  }
}

Main.main()