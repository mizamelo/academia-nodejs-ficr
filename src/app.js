require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? '.env.test' : '.env'
})

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

const { url } = require('./config/database')

class AppController{
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
        this.database()
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
    async database(){
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    }
}


module.exports = new AppController().app