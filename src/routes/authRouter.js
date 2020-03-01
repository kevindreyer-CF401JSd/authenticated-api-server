const express = require('express')
const authRouter = express.Router()

const ROUTEBASE = process.env.ROUTEBASE

authRouter.get('/hiauth', (req, res) => {
  res.status(200).json({ hello: 'auth'})
})

const User = require('../models/users')
const basicAuth = require('../middleware/basicAuth')
const bearerAuth = require('../middleware/bearerAuth')
const handleOauth = require('../middleware/handleOauth')

//signup
authRouter.post('/signup', (req, res, next) => {
  const user = new User(req.body)
  user.save()
    .then(result => res.status(200).json({ token: user.generateToken() }))
    .catch(next)
})

//signin
authRouter.post('/signin', basicAuth, (req, res, next) => {
  res.status(200).json({ token: req.token })
})

//get all users
authRouter.get('/users', async (req, res, next) => {
  const allUsers = await User.find()
  res.status(200).json(allUsers)
})

//bearer auth
authRouter.get('/supersecret', bearerAuth, async (req, res, next) => {
  res.status(200).json([{ username: req.user.username, userValid: req.user.valid }])
})

//oauth
authRouter.get('/oauth', handleOauth, (req, res, next) => {
  res.status(200).json({ message: 'signed in with oauth' })
})

module.exports = authRouter
