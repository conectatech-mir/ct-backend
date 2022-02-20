const bcrypt = require('bcrypt')
const { Schema, model, Document } = require('mongoose')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['USER', 'PROFESSIONAL'],
    default: 'USER',
  },
  phone: {
    type: String,
  },
  about: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.statics.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)

  return await bcrypt.hash(password, salt)
}

userSchema.methods.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

userSchema.virtual('fullName')
  .get(() => this.firstName + ' ' + this.lastName)
  .set((v) => this.firstName + ' ' + this.lastName)

module.exports = model('User', userSchema)