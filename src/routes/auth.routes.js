const express = require('express')
const { body } = require('express-validator')
const { login, register, logout, professionalRegister } = require('../controllers/auth.controller')
const { emailAlreadyInUse, userWithEmailExist, userPasswordMatch, authenticateToken } = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/login',
  [
    body('email').isEmail().withMessage('E-mail is not valid'),
    body('email').custom(userWithEmailExist),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
    body('password').custom(userPasswordMatch)
  ],
  login
)
router.post('/register',
  [
    body('email').isEmail().withMessage('El email no es válido'),
    body('email').custom(emailAlreadyInUse),
    body('firstName').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('lastName').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  register
)
router.post('/p/register',
  [
    body('email').isEmail().withMessage('El email no es válido'),
    body('email').custom(emailAlreadyInUse),
    body('firstName').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('lastName').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  ],
  professionalRegister
)
router.post('/logout', authenticateToken, logout)

module.exports = router