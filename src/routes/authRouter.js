const express = require('express')
const authRouter = express.Router()

authRouter.get('/hiauth', (req, res) => {
  res.status(200).json({ hello: 'auth'})
})

module.exports = authRouter