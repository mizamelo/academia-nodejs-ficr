const User = require('../models/userModel')
const Queue = require('../lib/Queue')

class UserController{
    
    async create(req, res){
        try {
            const { email } = req.body

            const result = await User.findOne({ email })
            if(result) return res.json({error: "usuario já cadastrado"})

            const user = await User.create(req.body)

            await Queue.add({ user })

            return res.json(user)
        } catch (error) {
            return res.json(error.message)
        }
    }

    async get(req, res){
        try {
            const user = await User.find({})
            return res.json(user)
        } catch (error) {
            return res.json(error)
        }

    }

}


module.exports = new UserController()