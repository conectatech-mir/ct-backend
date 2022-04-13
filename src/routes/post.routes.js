const express = require('express')
const { check, body } = require('express-validator')
const { store, getById, getAllPostsForUsuario, getAllPostsForProfesional, getAllPosts, getPostAccepted, getPostAcceptedPending } = require('../controllers/post.controller')
const { authenticateToken } = require('../middlewares/auth.middleware')
const { validateField } = require('../middlewares/user.middleware')

const router = express.Router()

router.get('/posts', getPostAccepted)

router.get('/posts', getPostAcceptedPending)

router.get('/postProfesional', getAllPostsForProfesional)

router.get('/postUsuario/:id', getAllPostsForUsuario)

router.post('/', [
  authenticateToken,
  body('user').isMongoId().withMessage('User is not valid'),
  body('title').isLength({ min: 5 }).withMessage('The title must have at least 5 characters'),
  body('body').isLength({ min: 5 }).withMessage('The body must have at least 5 characters'),
  validateField
], store);

router.get('/:id', [
  authenticateToken,
  check('id').isMongoId().withMessage('Id is not valid'),
  validateField
], getById)

module.exports = router