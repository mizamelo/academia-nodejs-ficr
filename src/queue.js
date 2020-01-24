require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? '.env.test' : '.env'
})

const Queue = require('./app/lib/Queue')
const RegistrationMail = require('./app/jobs/RegistrationMail')

Queue.process(RegistrationMail.handle)