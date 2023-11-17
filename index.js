const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./util/database');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config();
const corsOptions = {
    origin: 'http:http://localhost:3000', // Specify the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies and credentials
    optionsSuccessStatus: 204, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
const auth = require('./routes/auth.route');
const product = require('./routes/product.route');
const cart = require('./routes/cart.route');
const order = require('./routes/order.route');
const category = require('./routes/category.route');
app.use('/',auth);
app.use('/',product);
app.use('/',cart);
app.use('/',order);
app.use('/',category);

db.sync().then(()=>{
    app.listen(4000);
    console.log('Server started');
})
.catch(error=>{
    console.log(error);
})