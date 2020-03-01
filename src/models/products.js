const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
  name: { type: String },
  description: { type: String }
})

module.exports = mongoose.model('categories', productsSchema);