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

module.exports = {
  validateField,
  existsUserById,
}
