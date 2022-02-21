const { Schema, model } = require('mongoose')

const subscriptionSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  plan: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
  }
}, {
  timestamps: true,
})

module.exports = model('Subscription', subscriptionSchema)