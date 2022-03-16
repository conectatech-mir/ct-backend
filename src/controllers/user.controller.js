const bcryptjs = require('bcryptjs')
const Rating = require('../models/rating.model')
const User = require('../models/user.model')

const list = async (req, res) => {
  // req.user is the authenticated user

  // const ratings = await Rating.find({}).populate('user')
  // const user = await User.findOne({ email: req.user.email }).populate('ratings')
  // const marge = await User.findOne({ email: 'marge@mail.com' }).populate('ratings')

  // const rating = await Rating.create({
  //   user: user._id,
  //   professional: marge._id,
  //   body: 'Marge is a great professional',
  //   value: 5
  // })

  // user.ratings.push(rating)
  // await user.save()
  // marge.ratings.push(rating)
  // await marge.save()

  // console.log(user.ratings);
  res.status(200).json({
    ok: true,
    data: await User.find({}),
  })
}

const getUserById = async (req, res) => {
  const { id } = req.params
  try {
    const user = User.findById(id)
    res.status(200).json({
      ok: true,
      message: 'response from getUserById',
      user
    })
  } catch (err) {
    console.log('error', err)
    res.status(500).json({
      ok: false,
      message: 'response from getUserById',
      msg: err
    })
  }
}

const editUserById = async (req, res) => {
  const { id } = req.params
  const { rol, ratings, password, ...rest } = req.body
  try {
    if (password) {
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync( password, salt )
    }
    const userEdited = await User.findByIdAndUpdate( id, rest )
    res.status(200).json({
      ok: true,
      message: 'response from editUserById',
      userEdited
    })
  } catch (err) {
    console.log('error', err)
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
    const userDeleted = await User.findByIdAndRemove( id )
    res.status(200).json({
      ok: true,
      message: 'response from deleteUserById',
      userDeleted
    })
  } catch (err) {
    console.log('error', err)
    res.status(500).json({
      ok: false,
      message: 'response from deleteUserById',
      msg: userDeleted
    })
  }
}

module.exports = {
  list,
  getUserById,
  editUserById,
  deleteUserById
}