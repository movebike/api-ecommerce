const mongoose = require('mongoose')

const MONGO_URL = process.env.URL_MONGO || ''

function connect () {
  return mongoose.connect(MONGO_URL, {})
}

module.exports = {
  connect
}