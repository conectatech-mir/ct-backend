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

module.exports = {
  list
}