const { Schema, model } = require('mongoose')

const planSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    default: 0,
  },
  proposals: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
})

module.exports = model('Plan', planSchema)