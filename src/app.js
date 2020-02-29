const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// Setup express app
const app = express()

// app level Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())  //request are JSON Objects

// Routes
app.get('/hi', (req, res) => {
  res.status(200).json({ hello:'world' })
})


// Error catching

// Export
module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}.`)
    })
  }
}