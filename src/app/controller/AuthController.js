require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? '.env.test' : '.env'
})

const jwt = require('jsonwebtoken')
const validator = require('validator')
const { promisify } = require('util')

class AuthController{
    async auth(req, res, next ) {

        const { authorization } = req.headers
    
        if (!authorization) return res.send(401)
    
        try {
            const [, token] = authorization.split(' ')
            validator.isJWT(token)
            const promise = promisify(jwt.verify)
            const { _id: id } = await promise(token, process.env.SECRETORKEY)
            req.user = {
                id
            }
            return next()
    
        } catch (error) {
            return res.sendStatus(401)
        }
    
    
    }
}


module.exports = new AuthController().auth