/**
 * Products Schema File
 */
const mongoose = require('mongoose')

/**
 * Mongoose productsSchema
 */
const productsSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: 'This is the products description' },
  category: { type: String, default: 'stuff' }
})

module.exports = mongoose.model('products', productsSchema);