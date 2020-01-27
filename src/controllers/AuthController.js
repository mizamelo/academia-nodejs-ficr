const User = require('../models/UserModel')
const { promisify } = require('util')

class AuthController {
  async register (req, res, next) {
    const { email } = req.body

    try {
      if (await User.findsOne({ email })) 
        throw new ErrorHandle(404, 'Email já existe')
        // return res.send({ error: 'Email já existe' })

      const user = User.create(req.body)

      const generateToken = promisify(User.generateToken)
      const token = await generateToken(user.d)
  
      return res.send({
        user,
        token
      })
    } catch (error) {
      next(error)
    }
   
  }
}

module.exports = new AuthController()