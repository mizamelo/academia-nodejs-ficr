const { readFileSync, writeFileSync } = require('fs')

class FileHelper {
  constructor () {
  }

  get({ path }) {
    return readFileSync(path).toString()
  }

  write ({ path, data }) {
    return writeFileSync(path, data).toString()
  }
}

module.exports = new FileHelper()