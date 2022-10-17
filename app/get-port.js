const { ipcRenderer } = require('electron')

ipcRenderer.on('api-port', function (event, port) {
  localStorage.setItem('port', port)
})
