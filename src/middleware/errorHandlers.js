function errorHandler (err, req, res, next) {
  console.log('___SERVER ERROR___', err)
  res.status(500).json({ error: err.message })
}

function notFoundHandler (req, res, next) {
  res.status(404).json({ error: 'Resource Not Found' })
}

module.exports = {errorHandler, notFoundHandler}