/**
 * Error Handlers
 * @module errorHandlers
 */

/**
 * Error Handler 500
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function errorHandler (err, req, res, next) {
  console.log('___SERVER ERROR___', err)
  res.status(500).json({ error: err.message })
}

/**
 * Not Found 404 Handler
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function notFoundHandler (req, res, next) {
  res.status(404).json({ error: 'Resource Not Found' })
}

module.exports = {errorHandler, notFoundHandler}