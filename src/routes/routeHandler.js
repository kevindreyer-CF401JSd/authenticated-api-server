/**
 * simple Routes
 * @module routeHandler
 */
const express = require('express')
const routeHandler = express.Router()

const ROUTEBASE = process.env.ROUTEBASE

routeHandler.get(`${ROUTEBASE}/about`, (req, res) => {
  res.status(200).json({ 
    about:'This is a fully functional Authentication and Authorization API Server',
    help:'place help here'
  })
})

routeHandler.get(`${ROUTEBASE}/*`, (req, res) => {
  res.status(200).json({ hello:'you need to put a route in your route' })
})

module.exports = routeHandler
