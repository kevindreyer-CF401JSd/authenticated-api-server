function accessControlList (permission) {
  return function (req, res, next) {
    try {
      if (req.user.role.permission.includes(permission)) {
        next()
      } else {
        next(new Error('No Access'))
      }
    } catch (error) {
      next(error)
    }
  }
}
module.exports = accessControlList