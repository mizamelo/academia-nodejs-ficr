const { Router } = require('express')

//Controllers
const userController = require('./app/controller/UserController')
const routes = Router()

routes.post('/users', userController.create)
routes.get('/users', userController.get)


module.exports = routes