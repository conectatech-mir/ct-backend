const User = require('../models/user.model')

const list = async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    ok: true,
    data: await User.find({}),
  })
}

module.exports = {
  list
}