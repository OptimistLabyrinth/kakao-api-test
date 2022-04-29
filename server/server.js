#!/usr/bin/env node
const app = require('./app')
const debug = require('debug')('server:server')
const dotenv = require('dotenv')
const fs = require('fs')
const https = require('https')
const path = require('path')

dotenv.config({ path: '.env' })
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.resolve('.env.production.local') })
} else {
  dotenv.config({ path: path.resolve('.env.development.local') })
}

// eslint-disable-next-line no-undef
const port = normalizePort(process.env.PORT || '3500')
app.set('port', port)
// eslint-disable-next-line no-undef
const domainUrl = process.env.DOMAIN_URL
const server = https.createServer(
  {
    key: fs.readFileSync(
      path.resolve('certificates', domainUrl, 'privkey.pem')
    ),
    cert: fs.readFileSync(path.resolve('certificates', domainUrl, 'cert.pem')),
    ca: fs.readFileSync(
      path.resolve('certificates', domainUrl, 'fullchain.pem')
    ),
  },
  app
)
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
