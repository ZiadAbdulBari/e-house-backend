const express = require('express');
const { addVariant, getVariant } = require('../controllers/variant.controller');
const route = express.Router();
route.post('/add-variant',addVariant);
route.get('/get-variant',getVariant);
module.exports = route;