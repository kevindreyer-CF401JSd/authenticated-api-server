const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET = process.env.SECRET

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: 'supersecretpassword' },
  valid: { type: Boolean, default: true }
})

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

userSchema.methods.generateToken = function () {
  const tokenData = {
    id: this._id,
    username: this.username,
    userValid: this.valid
  }
  return jwt.sign(tokenData, SECRET, { expiresIn: '1h' })
}

module.exports = mongoose.model('User', userSchema)