const fs = require('fs')
const { get } = require('../helpers/FileHelper')

const Product = require('../models/ProductModel')
const Company = require('../models/CompanyModel')

class ProductsController {
  async create (req, res) { // POST /products
    const { description, price } = req.body

    try {
      const response = await Product.create({
        description,
        price
      })
  
      return res.json({ response })
    } catch (error) {
      return res.json({ error })
    }
    
  }

  async read (req, res) {
    const response = await Promise.all([
      Product.find(),
      Company.find()
    ])
    return res.json({ response })
  }

  async update (req, res) {
    const { id: _id } = req.params

    const response = await Product.updateOne({ _id } ,
      req.body
    )

    return res.json({ response })
  }

  async delete (req, res) {
    const { id: _id } = req.params

    const response = await Product.deleteOne({ _id })

    return res.json({ response })
  }
}

module.exports = new ProductsController()