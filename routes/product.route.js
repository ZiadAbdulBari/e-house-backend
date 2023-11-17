const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { addProduct, getProduct, getProductDetails } = require('../controllers/product.controller');
const route = express.Router();
route.post('/add-product',addProduct);
route.get('/get-product',getProduct);
route.get(`/product-detail/:id`,getProductDetails);

module.exports = route;