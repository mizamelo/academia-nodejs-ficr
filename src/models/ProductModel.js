const { Schema, model } = require('mongoose')

const ProductModel = new Schema({
  description: String,
  price: Number
})

module.exports = model('Product', ProductModel)