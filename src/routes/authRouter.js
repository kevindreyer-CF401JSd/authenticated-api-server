const express = require('express')
const authRouter = express.Router()

authRouter.get('/hiauth', (req, res) => {
  res.status(200).json({ hello: 'auth'})
})

const User = require('../models/users')

//signup
authRouter.post('/signup', (req, res, next) => {
  const user = new User(req.body)
  user.save()
})

//signin

//get users

//bearer auth

//oauth

module.exports = authRouter