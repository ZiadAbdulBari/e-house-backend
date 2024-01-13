const express = require('express');
const { registration, login, updateProfile, getProfile } = require('../controllers/auth.controller');
const tokenCheck = require('../middleware/token-checker');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const route = express.Router();

route.post('/registration',registration);
route.post('/login',login);
route.post('/update-profile',tokenCheck,upload.single('image'),updateProfile);
route.get('/get-profile',tokenCheck,getProfile);
module.exports = route;