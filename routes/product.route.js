const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { addProduct, getProduct, getProductDetails, addVariantValue } = require('../controllers/product.controller');
const route = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
route.post('/add-product',upload.array('images', 6),addProduct);
route.get('/get-product',getProduct);
route.post('/add-variant-value',addVariantValue);
route.get(`/product-detail/:id`,getProductDetails);

module.exports = route;