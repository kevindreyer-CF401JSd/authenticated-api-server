/**
 * Products Schema
 * @module products
 */
const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: 'This is the products description' },
  category: { type: String, default: 'stuff' }
})

module.exports = mongoose.model('products', productsSchema);