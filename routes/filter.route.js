const express = require('express');
const { search } = require('../controllers/filter.controller');
const route = express.Router();

route.post('/filter/:search&:category&:subcategory',search);

module.exports = route;

// http://localhost:4000/filter/search=false&category=false&subcategory=false