const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { placeOrder, addShippingAddress, getShippingAddress, deleteShippingAddress } = require('../controllers/order.controller');
const route = express.Router();

route.post('/place-order', tokenCheck, placeOrder);
route.post('/add-shipping-address', tokenCheck, addShippingAddress);
route.get('/get-shipping-address', tokenCheck, getShippingAddress);
route.post('/delete-shipping-address', tokenCheck, deleteShippingAddress);

module.exports = route;