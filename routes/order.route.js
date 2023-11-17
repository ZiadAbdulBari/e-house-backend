const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { placeOrder } = require('../controllers/order.controller');
const route = express.Router();

route.post('/place-order',tokenCheck,placeOrder);

module.exports = route;