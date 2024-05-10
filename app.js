// imports
// initial setup
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')        // cross-origin resource sharing
const contactsRouter = require('./routes/contacts')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

// setup MongoDB connection
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB!\n', error.message)
  })

// load Middleware (VERY PARTICULAR ORDER)
app.use(cors()) // accept frontend resources from different origin
app.use(express.static('dist')) // Static site rendering
app.use(express.json()) // json-parser for body
app.use(middleware.requestLogger)

// redirect HTTP requests to router
app.use('/api/contacts', contactsRouter)

// Error Handlers
app.use(middleware.unknownEndpoint)    // load before-last Middleware
app.use(middleware.errorHandler)  // ALWAYS last loaded Middleware

// export to index
module.exports = app