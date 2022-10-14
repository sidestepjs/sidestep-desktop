const { app, BrowserWindow, Menu, screen } = require('electron')
const path = require('path')

process.env.NODE_ENV = 'production'

const isMac = process.platform === 'darwin'
const isDev = process.env.NODE_ENV !== 'production'

// app is ready
app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  let mainWindow = null

  // Create main window
  const createMainWindow = () => {
    mainWindow = new BrowserWindow({
      width: Math.floor(width * 0.8),
      height: Math.floor(height * 0.8),
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

    // Load main.html
    mainWindow.loadFile('app/index.html')
  }

  createMainWindow()

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
