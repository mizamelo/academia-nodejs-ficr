const express = require('express')
const mongoose = require('mongoose')

const router = require('./routes')

class App {
  constructor () {
    this.express = express()
    this.middlewares()
    
    this.database()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use(router)
  }

  database () {
    mongoose.connect('mongodb://localhost:27017/ficr', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  }
}

module.exports = new App().express