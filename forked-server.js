const { app: server } = require('./server')

const serverInstance = server.listen(0, async function () {
  const port = serverInstance.address().port
  console.log(`listener at http://localhost:${port}`)
  process.send('FORKED_SERVER_PORT', port)
})
