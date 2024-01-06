const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { addProduct, getProduct, getProductDetails, addVariantValue } = require('../controllers/product.controller');
const route = express.Router();
route.post('/add-product',addProduct);
route.get('/get-product',getProduct);
route.post('/add-variant-value',addVariantValue);
route.get(`/product-detail/:id`,getProductDetails);

module.exports = route;