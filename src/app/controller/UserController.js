const UserModel = require('../models/userModel')
const Queue = require('../lib/Queue')

class UserController{
    
    async genToken(req, res){
        try {
            const { email, password } = req.body
            const user = await UserModel.getByCredentials(email, password)
            const token = await user.genToken()
            return res.send({token})
        } catch ({ message }) {
            return res.status(401).send({error: message})
        }
    }

    async create(req, res){
        try {
            const { email } = req.body
            const result = await UserModel.findOne({ email })
            if(result) return res.status(401).send({error: "usuario já cadastrado"})
            const user = await UserModel.create(req.body)
            const token = await user.genToken()
            await Queue.add({ user })

            return res.status(201).json({
                user,
                token
            })
        } catch ({ message }) {
            return res.status(500).send({error: message})
        }
    }

    async update(req, res){
        try {
            const { id } = req.user
            const user = await UserModel.findById(id)
            user.set({
                ...req.body
            })
            const result = await user.save()
            return res.send({ result })
        } catch ({ message }) {
            return res.status(500).send({error: message})
        }
    }

    async get(req, res){
        try {
            const { id } = req.user
            const user = await UserModel.findById(id)
            return res.json(user)
        } catch ({ message }) {
            return res.status(500).send({error: message})
        }
    }

}// Key Class


module.exports = new UserController()