const app = require('../../src/app')
const request = require('supertest')(app)
const UserModel = require('../../src/app/models/userModel')
const mongoose = require('mongoose')

describe('Validate', () => {

    beforeAll( async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
    })

    afterAll( async () => {
        await mongoose.connection.close()
    })

    beforeEach( async () => {
        await UserModel.deleteMany()
    })

    it(('validator'), async () => {
        const user = await UserModel.create({
            name: "francisco",
            email: "franc1sc1566@gmail.com",
            password: "banana123"
        })
        expect(user.name).toEqual("francisco")

    })

})