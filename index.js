// get environment variables
require('dotenv').config()
const { MONGODB_URI, PORT } = process.env

// Connect to MongoDB
const mongoose = require('mongoose')
const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex:true,
}

mongoose.connect(MONGODB_URI, mongooseOptions, () => {
  console.log(`Connected to MongoDB: ${MONGODB_URI}`)
})

// Start Express Server
const server = require('./src/app')
server.start(PORT);