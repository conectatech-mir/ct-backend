const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const DB = require('./config/db')
const routes = require('./routes')
require('dotenv').config()

DB.connect();

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api', routes)

app.use('*', (req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page not found'
  })
})

module.exports = app