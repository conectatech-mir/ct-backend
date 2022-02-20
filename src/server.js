const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const routes = require('./routes')
require('dotenv').config()

connectDB()

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

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))