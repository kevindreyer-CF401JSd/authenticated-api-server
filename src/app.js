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

const authRouter = require('./routes/authRouter')
app.use(authRouter)
const routeHandler = require('./routes/routeHandler')
app.use(routeHandler)


// Error catching
const {errorHandler, notFoundHandler} = require('./middleware/errorHandlers')
app.use(notFoundHandler)
app.use(errorHandler)

// Export
module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Express server listening on port ${port}.`)
    })
  }
}