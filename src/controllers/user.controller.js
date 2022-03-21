const bcryptjs = require('bcryptjs')
const User = require('../models/user.model')

const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)

    if (!user) throw new Error('User not found')

    res.status(200).json({
      ok: true,
      data: user
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'response from getUserById',
      msg: err
    })
  }
}

const editUserById = async (req, res) => {
  const { id } = req.params
  const { ratings, password, ...rest } = req.body

  try {
    if (password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt)
    }

    const userEdited = await User.findByIdAndUpdate(id, rest)

    res.status(200).json({
      ok: true,
      message: 'response from editUserById',
      userEdited
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'response from editUserById',
      msg: err
    })
  }
}

const deleteUserById = async (req, res) => {
  const { id } = req.params

  try {
    const userDeleted = await User.findByIdAndRemove(id)

    res.status(200).json({
      ok: true,
      message: 'response from deleteUserById',
      userDeleted
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: 'response from deleteUserById',
      msg: userDeleted
    })
  }
}

module.exports = {
  getUserById,
  editUserById,
  deleteUserById
}