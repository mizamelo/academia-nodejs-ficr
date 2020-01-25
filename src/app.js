require('dotenv').config()

const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

class AppController{
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
        this.database()
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(compression())
        this.app.use(helmet())
    }
    routes(){
        this.app.use(require('./routes.js'))
    }
    async database(){
        const { connect } = require('mongoose')
        await connect('mongodb://localhost/try3',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
    }
}


module.exports = new AppController().app