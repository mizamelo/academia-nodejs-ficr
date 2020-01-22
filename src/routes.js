const { Router } = require('express')

// Controllers
const FruitsController = require('./controllers/FruitsController')

const app = Router()

app.post('/fruits', FruitsController.create)
app.get('/fruits', FruitsController.read)
app.put('/fruits/:id', FruitsController.update)
app.delete('/fruits/:id', FruitsController.delete)

module.exports = app