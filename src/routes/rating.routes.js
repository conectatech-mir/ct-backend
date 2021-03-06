const express = require('express')
const { body } = require('express-validator')
const { store } = require('../controllers/rating.controller')
const { authenticateToken } = require('../middlewares/auth.middleware')
const { validateField } = require('../middlewares/user.middleware')

const router = express.Router()

router.post('/', [
  authenticateToken,
  body('user').isMongoId().withMessage('User is not valid'),
  body('professional').isMongoId().withMessage('Professional is not valid'),
  body('post').isMongoId().withMessage('Post is not valid'),
  body('body').isLength({ min: 5 }).withMessage('The comment must have at least 5 characters'),
  body('value').isInt({ min: 1, max: 5 }).withMessage('The value must be between 1 and 5'),
  validateField
], store)

module.exports = router