const {Schema, model} = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
})

UserSchema.pre('save',async function(next) {
    if (!this.isModified("password")) next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.genToken = async function() {
    const promise = promisify(jwt.sign)
    return await promise({_id: this._id}, process.env.SECRET_KEY, {
        expiresIn: '3h'
    })
}

UserSchema.statics.getByCredentials = async function(email, password) {
    const UserModel = this
    const user = await UserModel.findOne({ email })

    if (!user) throw new Error("User not Found!!")
    if( !await user.isPassword(password) ) throw new Error('Invalid password !!')

    return user

}

module.exports = model('users', UserSchema)