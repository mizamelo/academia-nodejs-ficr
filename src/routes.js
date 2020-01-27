const { Router } = require('express')

// Helpers
const { errorHandle } = require('./helpers/ErrorHelper')

// Controllers
const ProductsController = require('./controllers/ProductsController')
const AuthController = require('./controllers/AuthController')

const app = Router()

app.post('/register', AuthController.register)

app.post('/products', ProductsController.create)
app.get('/products', ProductsController.read)
app.put('/products/:id', ProductsController.update)
app.delete('/products/:id', ProductsController.delete)

app.use((err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500
  errorHandle(err, res)
})

module.exports = app