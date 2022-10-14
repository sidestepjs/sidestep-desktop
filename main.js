const { app, dialog, screen, BrowserWindow, Menu } = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')

process.env.NODE_ENV = 'production'

const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV !== 'production'

// app is ready
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  let mainWindow = null
  let splashWindow = null

  // Create main window
  const createMainWindow = () => {
    mainWindow = new BrowserWindow({
      width: Math.floor(width * 0.8),
      height: Math.floor(height * 0.8),
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    })

    // Open devtools if in development
    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
    if (!isDev) {
      autoUpdater.checkForUpdates()
    }

    // Load main.html
    mainWindow.loadFile('app/index.html')
  }

  // create a splash screen
  const createSplashWindow = () => {
    splashWindow = new BrowserWindow({
      width: 500,
      height: 300,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
    })

    // Load main.html
    splashWindow.loadFile('app/splash.html')
  }

  createMainWindow()
  createSplashWindow()

  // show splash then main window
  setTimeout(() => {
    splashWindow.close()
    mainWindow.show()
  }, 5000)

  //Menu for macos
  const menuTemplate = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: 'quit',
                click: () => app.quit(),
                accelerator: 'Command+Q',
              },
            ],
          },
        ]
      : []),
    {
      label: 'Actions',
      submenu: [
        {
          label: 'Quit',
          click: () => {
            app.quit()
          },
          accelerator: 'CmdOrCtrl+W',
        },
      ],

      role: 'fileMenu',
    },
  ]

  const mainMenu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(mainMenu)

  // remove main window from memory on close
  mainWindow.on('closed', () => (mainWindow = null))

  // Handle `activate` event that serves only in the macOS environment
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (!isMac) {
    app.quit()
  }
})

// auto updater events
autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'A new version has being downloaded. Restart application to apply changes.',
  }

  dialog.showMessageBox(dialogOpts).then(({ response }) => {
    if (response === 0) {
      setImmediate(() => {
        autoUpdater.quitAndInstall()
      })
    }
  })
})

autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version is being downloaded.',
  }

  dialog.showMessageBox(dialogOpts).then(({ response }) => {})
})

/**
 
  TODO: UPDATE PROGRESS - will be done when we add IPC

  const log = require('electron-log');
  const { autoUpdater } = require("electron-updater");
  autoUpdater.logger = log;
  log.info('App starting...');    
  autoUpdater.on('download-progress', (progressObj) => {
      let log_message = "Download speed: " + progressObj.bytesPerSecond;
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
      log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
      sendStatusToWindow(log_message);
  })

  function sendStatusToWindow(text) {
      log.info(text);
      homePageWindow.webContents.send('message', text);
  }
 */
