import log from 'electron-log'
import { existsSync, readFileSync, writeFileSync } from "original-fs"

export default class LauncherConfiguration {
  public static title = 'Minecraft UTS Launcher' // ,-,
  public static width = 1000
  public static height = 600
  public static x = -1
  public static y = -1

  public static locale = 'en-US'
  public static keepLauncherOpen = true
  public static disableGPU = false
  public static enableHistorical = false
  public static enableReleases = true
  public static enableSnapshots = false
  public static animatePageTransition = false
  public static animatePlayButton = false 
  
  public static load(path: string): void {
    if(!existsSync(path)) writeFileSync(path, '')

    try {
      const opts = JSON.parse(readFileSync(path).toString('utf-8'))
      this.title = opts.title ?? this.title
      this.width = opts.width ?? this.width
      this.height = opts.height ?? this.height
      this.x = opts.x ?? this.x
      this.y = opts.y ?? this.y

      this.locale = opts.locale ?? this.locale
      this.keepLauncherOpen = opts.keepLauncherOpen ?? this.keepLauncherOpen
      this.disableGPU = opts.disableGPU ?? this.disableGPU
      this.enableHistorical = opts.enableHistorical ?? this.enableHistorical
      this.enableReleases = opts.enableReleases ?? this.enableReleases
      this.enableSnapshots = opts.enableSnapshots ?? this.enableSnapshots
      this.animatePageTransition = opts.animatePageTransition ?? this.animatePageTransition
      this.animatePlayButton = opts.animatePlayButton ?? this.animatePlayButton

    } catch(e) {
      log.warn('Failed to load launcher settings.')
    }
  }

  public static save(path: string): void {
    try {
      const opts = JSON.stringify({
        title: this.title,
        width: this.width,
        height: this.height,
        x: this.x,
        y: this.y,
        locale: this.locale,
        keepLauncherOpen: this.keepLauncherOpen,
        disableGPU: this.disableGPU,
        enableHistorical: this.enableHistorical,
        enableReleases: this.enableReleases,
        enableSnapshots: this.enableSnapshots,
        animatePageTransition: this.animatePageTransition,
        animatePlayButton: this.animatePlayButton
      }, null, 2)

      writeFileSync(path, opts)
    } catch(e) {
      log.warn('Failed to save launcher settings.')
    }
  }
}