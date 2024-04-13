const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Item', itemSchema)
