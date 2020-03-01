const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRET = process.env.SECRET || 'changeme'

//mongoose schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, default: 'supersecretpassword' },
  valid: { type: Boolean, default: true }
})

// save user to DB
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5)
  }
})

//generate JWT Token
userSchema.methods.generateToken = function () {
  const tokenData = {
    id: this._id,
    username: this.username,
    valid: this.valid
  }
  return jwt.sign(tokenData, SECRET, { expiresIn: '1h' })
}

// auth basic
userSchema.statics.authenticateBasic = function (username, password) {
  return this.findOne({ username })
    .then(result => result && result.comparePassword(password))
    .catch(console.error)
}

// auth JWT Token
userSchema.statics.authenticateToken = async function (token) {
  try {
    const tokenObject = jwt.verify(token, SECRET)
    if (!tokenObject.username) {
      return Promise.reject(new Error('Token is malformed'))
    }

    const user = await this.findOne({ username: tokenObject.username })
    if (user.valid) {
      return user
    } else {
      return Promise.reject(new Error('Token in valid'))
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

// compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password)
    .then(valid => valid ? this : null)
    .catch(console.error)
}

module.exports = mongoose.model('User', userSchema)