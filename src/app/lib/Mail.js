const nodeMailer = require('nodemailer')
const mailConfig = require('../../config/mail')

module.exports = nodeMailer.createTransport(mailConfig)