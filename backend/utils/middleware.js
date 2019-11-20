const requestLogger = (request, response, next) => {
    console.log(request.method, request.path, request.body)
    console.log('---')
    next()
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    next(error)
  }
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
  }