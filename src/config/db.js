const mongoose = require('mongoose')

module.exports = async () => {
  mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/test', {
    useNewUrlParser: true,
  })

  mongoose.connection.on('connected', () => console.log('Mongoose is connected'))

  mongoose.connection.on('error', (err) => console.log(err))
}