const Rating = require('../models/rating.model')

// TODO: Remove this function
const list = async (req, res) => {
  res.status(200).json({
    ok: true,
    data: await Rating.find({}).select('body value'),
  })
}

const store = async (req, res) => {
  const { user, professional, post, body, value } = req.body;

  try {
    const rating = new Rating({
      user,
      professional,
      post,
      body,
      value,
    });

    await rating.save();

    res.status(201).json({
      ok: true,
      data: {
        _id: rating._id,
        body: rating.body,
        value: rating.value,
      },
      message: 'Rating created successfully',
    })
  } catch (error) {
    res.status(403).json({
      ok: true,
      message: error.message,
    })
  }
}

module.exports = {
  list,
  store,
}