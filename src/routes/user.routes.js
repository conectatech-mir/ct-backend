const express = require('express')
const { check } = require('express-validator');
const { list, getUserById, editUserById, deleteUserById } = require('../controllers/user.controller')
const { authenticateToken } = require('../middlewares/auth.middleware')
const { validateField, existsUserById } = require('../middlewares/user.middleware')

const router = express.Router()

router.get('/getUserById/:id', [
  // authenticateToken,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existsUserById),
  validateField
], getUserById)

router.put('/editUserById/:id', [
  authenticateToken,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existsUserById),
  validateField
], editUserById)

router.delete('/deleteUserById/:id', [
  authenticateToken,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(existsUserById),
  validateField
], deleteUserById)

module.exports = router