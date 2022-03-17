const { Schema, model } = require('mongoose')

const ratingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
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