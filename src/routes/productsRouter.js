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

//acl read products auth
prodRouter.get('/products', bearerAuth, acl('read'), async (req, res, next) => {
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

//acl update patch products auth

//acl delete products auth

module.exports = prodRouter;