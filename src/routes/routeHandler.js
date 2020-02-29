const express = require('express')
const routeHandler = express.Router()

routeHandler.get('*', (req, res) => {
  res.status(200).json({ hello:'you need to put a route in your route' })
})

module.exports = routeHandler
