const requestLogger = (request, response, next) => {
  console.log(request.method, request.path, request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error('errorHandler', error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformatted id' })
  }
  if (error.name === 'ValidationError') {
    console.log(error)
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}