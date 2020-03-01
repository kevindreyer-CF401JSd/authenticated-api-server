const express = require('express');
const Products = require('../models/products');
const products = new Products();

const prodRouter = express.Router();

const productstest = []

const User = require('../models/users')
const Role = require('../models/roles')
const basicAuth = require('../middleware/basicAuth')
const bearerAuth = require('../middleware/bearerAuth')
const handleOauth = require('../middleware/handleOauth')
const acl = require('../middleware/accessControlList')

//acl read products auth
prodRouter.get('/products', bearerAuth, acl('read'), (req, res, next) => {
  res.status(200).json(productstest)
})

//acl create products auth
prodRouter.post('/products', bearerAuth, acl('create'), (req, res, next) => {
  productstest.push(req.body)
  res.json(req.body)
})

module.exports = prodRouter;