const express = require('express')

const routes = express.Router()

routes.use('/auth', require('./auth.routes'))
routes.use('/', require('./user.routes'))
routes.use('/ratings', require('./rating.routes'))
routes.use('/posts', require('./post.routes'))

module.exports = routes