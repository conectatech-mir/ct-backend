const express = require('express')
const { list, store } = require('../controllers/rating.controller')
const { authenticateToken } = require('../middlewares/auth.middleware')
const { validateField, isSameUser } = require('../middlewares/user.middleware')

const router = express.Router()

router.get('/', authenticateToken, list) // TODO: Remove this route
router.post('/', [authenticateToken, isSameUser, validateField], store)

module.exports = router