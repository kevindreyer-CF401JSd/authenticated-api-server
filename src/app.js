const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Setup express app
const app = express()

// app level Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())  //request are JSON Objects
app.use(express.static(path.join(__dirname, 'public')))

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Products API',
      description: 'Fully Authenticated and Authorized API server',
      contact: {
        name: 'Kevin Dreyer'
      },
      servers: ['http://localhost:3000']
    }
  },
  apis: ['app.js','./routes/*.js','./models/*.js','./middleware/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// Routes

const routeHandler = require('./routes/routeHandler')
app.use(routeHandler)
const authRouter = require('./routes/authRouter')
app.use(authRouter)
const rolesRouter = require('./routes/rolesRouter')
app.use(rolesRouter)
const productRouter = require('./routes/productsRouter')
app.use(productRouter)

/**
 *  @swagger
 *  /this_will_error:
 *  get:
 *    description: Use to test 500 error
 *    responses:
 *      '500':
 *        description: A 500 error response
 */
app.get('/this_will_error', (req, res) => {
  throw new Error('500 Error check route')
})

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