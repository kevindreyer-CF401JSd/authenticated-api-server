const User = require('../models/users')


function bearerAuth (req, res, next) {
  if (!req.headers.authorization) {
    next(new Error('No authorization in header'))
  }
  const token = req.headers.authorization.split(' ').pop()
  console.log('token',token)
  User.authenticateToken(token)
    .then(valid => {
      req.user = valid
      next()
    })
    .catch(err => {
      next(err)
    })
}

module.exports = bearerAuth