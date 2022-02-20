const express = require('express')
const { list } = require('../controllers/user.controller')
const { authenticateToken } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/users', authenticateToken, list)

module.exports = router