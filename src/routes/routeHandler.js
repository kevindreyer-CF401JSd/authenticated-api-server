const express = require('express')
const routeHandler = express.Router()

const ROUTEBASE = process.env.ROUTEBASE

routeHandler.get(`${ROUTEBASE}/*`, (req, res) => {
  res.status(200).json({ hello:'you need to put a route in your route' })
})

module.exports = routeHandler
