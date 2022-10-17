const { fork } = require('child_process')
const path = require('path')

let api = nil

try {
  const program = path.resolve('server.js')
  const parameters = []
  const options = {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  }
  api = fork(program, parameters, options)

  api.on('exit', function (code, signal) {
    log.info('child process exited with ' + `code ${code} and signal ${signal}`)
  })
  api.on('error', function (code, signal) {
    log.info(
      'child process errored with ' + `code ${code} and signal ${signal}`
    )
  })

  log.info(`API Instance: ${api}`)
} catch (e) {
  log.error(`Error: ${e}`)
}

console.log('This code is reachable')
if (api) {
  api.on('message', (message) => {
    log.info(`API Instance: message ${message}`)
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('api-port', message)
    })
  })
}
