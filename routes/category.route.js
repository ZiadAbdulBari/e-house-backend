const express = require('express');
const { makeCategory, getCategory, makeSubcategory, getSubCategory } = require('../controllers/category.controller');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();

route.post('/add-category',upload.single('image'),makeCategory);
route.get('/get-category',getCategory);
route.post('/add-subcategory',makeSubcategory);
route.get('/get-subcategory',getSubCategory);

module.exports = route;