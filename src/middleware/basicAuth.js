const base64 = require('base-64')
const User = require('../models/users')

function basicAuth (req, res, next) {

  if (!req.headers.authorization) {
    next(new Error('No authorization header'))
  }

  const basic = req.headers.authorization.split(' ').pop()
  const decoded = base64.decode(basic)
  const [user, pass] = decoded.split(':') 

  return User.authticateBasic(user, pass)
    .then(_validate)

  function _validate (user) {
    if (user) {
      req.user = user
      req.token = user.generateToken()
      next()
    } else {
      next(new Error('_validate error'))
    }
  }
}
module.exports = basicAuth