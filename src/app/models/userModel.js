const {Schema, model} = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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

UserSchema.pre('save', async function(next) {
    const salt = bcrypt.genSaltSync()
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

UserSchema.pre('updateOne', function(next) {

    const { password } = this._update
    if(password) {
        const salt = bcrypt.genSaltSync()
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

UserSchema.methods.isPassword = async function(password) {
    return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.genToken = async function() {
    return jwt.sign({_id: this._id}, process.env.SECRETORKEY)
}

UserSchema.statics.getByCredentials = async function(email, password) {

    const UserModel = this
    const user = await UserModel.findOne({ email })

    if (!user) throw new Error("User not Found!!")
    if( !await user.isPassword(password) ) throw new Error('Invalid password !!')

    return user

}

module.exports = model('users', UserSchema)