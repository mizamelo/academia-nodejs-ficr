const { Router } = require('express')
const { createAccountLimiter } = require("./utils/rateLimit");

//Controllers
const userController = require('./app/controller/UserController')
const auth = require('./app/controller/AuthController')
const routes = Router()

routes.post('/register',createAccountLimiter, userController.create)
routes.post('/token', userController.genToken)

routes.use(auth)

routes.patch('/users', userController.update)
routes.get('/users', userController.get)



module.exports = routes