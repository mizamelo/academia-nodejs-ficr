class ErrorHandle extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

const errorHandle = (err, res) => {
  const { statusCode, message } = err

  return res.status(statusCode).json({
    error: 'error',
    statusCode,
    message
  })
}

module.exports = {
  errorHandle,
  ErrorHandle
}