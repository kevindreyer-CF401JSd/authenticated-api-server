/**
 * Access Control List Module
 * @module accessControlList
 */

/**
 * accessControlList
 * @param {*} permission
 * @returns
 */
function accessControlList (permission) {
  console.log('permission',permission)
  return function (req, res, next) {
    try {
      // console.log('req.user.role.permission',req.user.role.permissions)
      if (req.user.role.permissions.includes(permission)) {
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