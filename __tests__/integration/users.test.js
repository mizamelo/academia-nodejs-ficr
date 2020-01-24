const app = require('../../src/app')
const request = require('supertest')(app)
const UserModel = require('../../src/app/models/userModel')
const mongoose = require('mongoose')

describe('Validate', () => {

    test(('validator'), async () => {
        const user = await UserModel.create({
            name: "francisco",
            email: "franc1sc15666455956@gmail.com",
            password: "123324"
        })

        expect("francisco").toEqual(user.name)

    })
})