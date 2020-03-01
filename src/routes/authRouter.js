const express = require('express')
const authRouter = express.Router()

const ROUTEBASE = process.env.ROUTEBASE
const products = []

authRouter.get('/hiauth', (req, res) => {
  res.status(200).json({ hello: 'auth'})
})

const User = require('../models/users')
const Role = require('../models/roles')
const basicAuth = require('../middleware/basicAuth')
const bearerAuth = require('../middleware/bearerAuth')
const handleOauth = require('../middleware/handleOauth')
const acl = require('../middleware/accessControlList')

//signup
authRouter.post('/signup', async (req, res, next) => {
  req.body.role = await Role.findOne({ name: req.body.role })
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

//acl read products auth
authRouter.get('/products', bearerAuth, acl('read'), async (req, res, next) => {
  res.status(200).json(products)
})

//acl create products auth
authRouter.post('/products', bearerAuth, acl('create'), async (req, res, next) => {
  products.push(req.body)
  res.json(req.body)
})

//oauth
authRouter.get('/oauth', handleOauth, (req, res, next) => {
  res.status(200).json({ message: 'signed in with oauth' })
})

module.exports = authRouter
