const { Schema, model } = require('mongoose')

const proposalSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  professional: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
}, {
  timestamps: true,
})

module.exports = model('Proposal', proposalSchema)