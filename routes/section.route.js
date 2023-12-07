const express = require('express');
const tokenCheck = require('../middleware/token-checker');
const { addSection, setSectionId, getSection } = require('../controllers/section.controller');
const route = express.Router();

route.post('/add-section',addSection);
route.post('/set-section-id',setSectionId);
route.get('/get-section',getSection);

module.exports = route;