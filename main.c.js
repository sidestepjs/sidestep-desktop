const { app, dialog, screen, BrowserWindow, Menu } = require('electron')
const { autoUpdater } = require('electron-updater')
const { app: server } = require('./server')

class ElectronApp {
  init({ logger, config: {} }) {
    this.useSplashScreen = true
    this.isMac = process.platform === 'darwin'
    this.isDev = process.env.NODE_ENV !== 'production'
    this.logger = logger
  }

  createWindow(opts) {}

  createCustomMenu() {}

  registerAutoUpdater() {}

  startDependentProcesses() {}
}

new ElectonApp({
  logger: null,
  config: {
    windows: [
      {
        name: 'main',
        loadUrl: '',
        dimensions: {},
      },
    ],
  },
})
