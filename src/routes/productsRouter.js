const express = require('express');
const Products = require('../models/products');
const products = new Products();

const prodRouter = express.Router();

const productstest = []

const User = require('../models/users')
const Role = require('../models/roles')
// const Product = require('../models/products')
const basicAuth = require('../middleware/basicAuth')
const bearerAuth = require('../middleware/bearerAuth')
const handleOauth = require('../middleware/handleOauth')
const acl = require('../middleware/accessControlList')

//read products auth
prodRouter.get('/products', bearerAuth, async (req, res, next) => {
  const allProducts = await Products.find()
  res.status(200).json(allProducts)
})

//acl create products auth
prodRouter.post('/products', bearerAuth, acl('create'), (req, res, next) => {
  const product = new Products(req.body)
  product.save()
  res.json(req.body)
})

//acl update put products auth
prodRouter.put('/products/:id', bearerAuth, acl('update'), (req, res, next) => {
  Products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(next)
})

//acl update patch products auth
prodRouter.patch('/products/:id', bearerAuth, acl('update'), (req, res, next) => {
  
})

//acl delete products auth
prodRouter.delete('/products/:id', bearerAuth, acl('delete'), (req, res, next) => {
  Products.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(202).json(result)
    })
    .catch(next)
})

module.exports = prodRouter;