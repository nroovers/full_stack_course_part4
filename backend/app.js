const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
    // console.log(error)
  })
  

// app.use(middleware.requestLogger)

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)

// app.use(middleware.errorHandler)
// app.use(middleware.unknownEndpoint)


module.exports = app