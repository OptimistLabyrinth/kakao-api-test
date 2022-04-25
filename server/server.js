#!/usr/bin/env node
const app = require('./app')
const debug = require('debug')('server:server')
const http = require('http')

// eslint-disable-next-line no-undef
const port = normalizePort(process.env.PORT || '3500')
app.set('port', port)
const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // * named pipe
    return val
  }

  if (port >= 0) {
    // * port number
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // * handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-undef
      console.error(bind + ' requires elevated privileges')
      // eslint-disable-next-line no-undef
      process.exit(1)
      break
    case 'EADDRINUSE':
      // eslint-disable-next-line no-undef
      console.error(bind + ' is already in use')
      // eslint-disable-next-line no-undef
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
  // eslint-disable-next-line no-undef
  console.log('Listening on ' + bind)
}
