const path = require('path')

const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const logger = require('morgan')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3050',
    methods: '*',
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.resolve('public')))

const v1Router = require('./api/v1/index')

app.use('/api/v1', v1Router)
app.use('*', (req, res) => {
  res.redirect('/')
})

module.exports = app
