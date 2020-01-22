const fs = require('fs')
const { get } = require('../helpers/FileHelper')

class FruitsController {
  create (req, res) {
    const { item } = req.body

    const file = get({
      path: './data.txt'
    })

    let data = file.split(',')

    const newData = [...data, item]

    fs.writeFileSync('./data.txt', newData.join(','))

    res.json({ msg: 'Atualizado' })
  }

  read (req, res) {
    const file = get('./data.txt')
    const data = file.split(',')
    res.json({ data })
  }

  update (req, res) {
    const { item } = req.body
    const { id } = req.params

    const file = fs.readFileSync('./data.txt').toString()
    const data = file.replace(id, item)
    fs.writeFileSync('./data.txt', data)

    return res.json({ data })
  }

  delete (req, res) {
    const { id } = req.params

    const file = fs.readFileSync('./data.txt').toString()
    const data = file.split(',')
    const newData = data.filter(fruit => fruit !== id)
    
    fs.writeFileSync('./data.txt', newData.join(','))

    return res.json({ data: newData })
  }
}

module.exports = new FruitsController()