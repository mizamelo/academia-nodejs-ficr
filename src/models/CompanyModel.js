const { Schema, model } = require('mongoose')

const CompanyModel = new Schema({
  description: String,
  addres: String
})

module.exports = model('Company', CompanyModel)