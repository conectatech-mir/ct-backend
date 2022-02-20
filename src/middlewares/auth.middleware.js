const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const emailAlreadyInUse = (email) => {
  return User.findOne({ email }).then(user => {
    if (user) {
      return Promise.reject('E-mail already in use');
    }
  });
}

const userWithEmailExist = (email) => {
  return User.findOne({ email }).then(user => {
    if (!user) {
      return Promise.reject('E-mail not found');
    }
  })
}

const userPasswordMatch = (password, { req }) => {
  return User.findOne({ email: req.body.email }).then(user => {
    if (!user.comparePassword(password, user.password)) {
      return Promise.reject('Usuario o contraseña incorrectos')
    }
  })
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(401).json({ error: 'Unauthorized' })

  jwt.verify(token, process.env.SECRET_KEY || 'secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' })

    req.user = user

    next()
  })
}

module.exports = {
  emailAlreadyInUse,
  userWithEmailExist,
  userPasswordMatch,
  authenticateToken,
}