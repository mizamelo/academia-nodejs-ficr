const User = require('../models/UserModel')
const { promisify } = require('util')

class AuthController {
  async register (req, res) {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) 
        return res.send({ error: 'Email já existe' })

      const user = await User.create(req.body)

      const generateToken = promisify(User.generateToken)
      const token = await generateToken(user.id)
  
      return res.send({
        user,
        token
      })
    } catch (error) {
      return res.send({ error: error.message })
      console.error(error)
    }
   
  }
}

module.exports = new AuthController()