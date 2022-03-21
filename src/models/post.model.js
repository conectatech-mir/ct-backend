const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accepted: {
    type: Schema.Types.ObjectId,
    ref: 'Proposal',
  },
}, {
  timestamps: true,
})

module.exports = model('Post', postSchema)