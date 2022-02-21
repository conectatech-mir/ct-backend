const { Schema, model } = require('mongoose')

const ratingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    default: 1
  }
}, {
  timestamps: true,
})

module.exports = model('Rating', ratingSchema)