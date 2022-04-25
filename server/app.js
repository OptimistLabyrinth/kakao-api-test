const path = require('path')

const cookieParser = require('cookie-parser')
const express = require('express')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('public')))

const indexRouter = require('./api/index')

app.use('/api', indexRouter)
app.use('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
})

module.exports = app
