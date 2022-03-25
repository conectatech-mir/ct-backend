const express = require('express')
const { body } = require('express-validator')
const { login, register, logout, professionalRegister } = require('../controllers/auth.controller')
const { emailAlreadyInUse, userWithEmailExist, userPasswordMatch, authenticateToken } = require('../middlewares/auth.middleware')
const { validateField } = require('../middlewares/user.middleware')

const router = express.Router()

router.post('/login',
  [
    body('email').isEmail().withMessage('E-mail is not valid'),
    body('email').custom(userWithEmailExist),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
    body('password').custom(userPasswordMatch),
    validateField,
  ],
  login
)
router.post('/register',
  [
    body('email').isEmail().withMessage('E-mail is not valid'),
    body('email').custom(emailAlreadyInUse),
    body('firstName').isLength({ min: 3 }).withMessage('Firstname must be at least 3 chars long'),
    body('lastName').isLength({ min: 3 }).withMessage('Lastname must be at least 3 chars long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
    validateField
  ],
  register
)
router.post('/p/register',
  [
    body('email').isEmail().withMessage('E-mail is not valid'),
    body('email').custom(emailAlreadyInUse),
    body('firstName').isLength({ min: 3 }).withMessage('Firstname must be at least 3 chars long'),
    body('lastName').isLength({ min: 3 }).withMessage('Lastname must be at least 3 chars long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars long'),
    validateField
  ],
  professionalRegister
)
router.post('/logout', authenticateToken, logout)

module.exports = router