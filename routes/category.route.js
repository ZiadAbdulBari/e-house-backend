const express = require('express');
const { makeCategory, getCategory, makeSubcategory, getSubCategory } = require('../controllers/category.controller');
const route = express.Router();

route.post('/add-category',makeCategory);
route.get('/get-category',getCategory);
route.post('/add-subcategory',makeSubcategory);
route.get('/get-subcategory',getSubCategory);

module.exports = route;