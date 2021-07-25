import path from 'path'

export default class Paths {
  public static join(...text: string[]) {
    return text.join('/')
  }
  public static dataDirectory = (() => {
    switch(process.platform) {
      case 'darwin': {
        return (path.join(process.env.HOME as string, 'Library', 'Application Support')).replace(/\\/g, '/') + '/.minecraft_uts'
      }
      case 'win32': {
        return (process.env.APPDATA as string).replace(/\\/g, '/') + '/.minecraft_uts'
      }
      case 'linux': {
        return (process.env.HOME as string).replace(/\\/g, '/') + '/.minecraft_uts'
      }
      default: {
        return ''
      }
    }
  })()
  public static launcherLog = Paths.join(Paths.dataDirectory, 'launcher_log.txt')
  public static launcherAppCache = Paths.join(Paths.dataDirectory, 'webcache')
  public static launcherSettings = Paths.join(Paths.dataDirectory, 'launcher_settings.json')
  public static javaVersionManifest = Paths.join(Paths.dataDirectory, 'versions/version_manifest_java.json')
  public static bugrockVersionManifest = Paths.join(Paths.dataDirectory, 'versions/version_manifest_bugrock.json')
  public static launcherProfiles = Paths.join(Paths.dataDirectory, 'launcher_profiles.json')
  public static launcherAccounts = Paths.join(Paths.dataDirectory, 'launcher_accounts.json')

  public static DATAPATH() {
    switch(process.platform) {
      case 'darwin': {
        return (path.join(process.env.HOME as string, 'Library', 'Application Support')).replace(/\\/g, '/') + '/.minecraft_uts'
      }
      case 'win32': {
        return (process.env.APPDATA as string).replace(/\\/g, '/') + '/.minecraft_uts'
      }
      case 'linux': {
        return (process.env.HOME as string).replace(/\\/g, '/') + '/.minecraft_uts'
      }
      default: {
        return ''
      }
    }
  }
}