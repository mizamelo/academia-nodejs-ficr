const app = require('../../src/app')
const request = require('supertest')(app)

describe('Validate', () => {

    test(('validator'), async () => {
        expect(20).toEqual(20)
    })
})