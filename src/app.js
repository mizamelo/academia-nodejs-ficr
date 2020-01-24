require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? '.env.test' : '.env'
})

const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

class AppController{
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(compression())
        this.app.use(helmet())
    }
    routes(){
        this.app.use(require('./routes.js'))
    }
}


module.exports = new AppController().app