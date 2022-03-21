const { validationResult } = require('express-validator')
const User = require('../models/user.model')

const validateField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next()
}

const existsUserById = async (id) => {
  const existsUser = await User.findById(id)
  if (!existsUser) {
    throw new Error(`El id ${id} no existe en la BD`)
  }
}

const isSameUser = (req, res, next) => {
  if (req.body.user !== req.user.id) {
    return res.status(403).json({
      ok: false,
      message: 'You do not have permissions to perform this action.'
    })
  }

  next()
}

module.exports = {
  validateField,
  existsUserById,
  isSameUser,
}
