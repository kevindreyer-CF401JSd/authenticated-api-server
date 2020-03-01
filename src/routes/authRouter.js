const express = require('express')
const authRouter = express.Router()

const ROUTEBASE = process.env.ROUTEBASE

authRouter.get('/hiauth', (req, res) => {
  res.status(200).json({ hello: 'auth'})
})

const User = require('../models/users')
// const basicAuth = require('../middleware/')
// const bearerAuth = require('../middleware/')

//signup
authRouter.post('/signup', (req, res, next) => {
  const user = new User(req.body)
  user.save()
    .then(result => res.status(200).json({ token: user.generateToken() }))
    .catch(next)
})

//signin

//get all users
authRouter.get('/users', async (req, res, next) => {
  const allUsers = await User.find()
  res.status(200).json(allUsers)
})

//bearer auth

//oauth

module.exports = authRouter