const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { addSection, setSectionId, getSection } = require('../controllers/section.controller');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();

route.post('/add-section',upload.single('image'),addSection);
route.post('/set-section-id',setSectionId);
route.get('/get-section',getSection);

module.exports = route;