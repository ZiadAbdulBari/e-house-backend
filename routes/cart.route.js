const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { addToCart, getCartData, quantityManagement, deleteCartProduct } = require('../controllers/cart.controller');
const route = express.Router();

route.post('/add-to-cart',tokenCheck, addToCart);
route.get('/get-cart', getCartData);
route.post('/quantity', quantityManagement);
route.post('/delete-from-cart', deleteCartProduct);

module.exports = route;