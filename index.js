const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require('./util/database');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config();
app.use(cors());
const auth = require('./routes/auth.route');
const product = require('./routes/product.route');
const cart = require('./routes/cart.route');
const order = require('./routes/order.route');
const category = require('./routes/category.route');
const filter = require('./routes/filter.route');
const section = require('./routes/section.route');
const variant = require('./routes/variant.route');
app.use('/',auth);
app.use('/',product);
app.use('/',cart);
app.use('/',order);
app.use('/',category);
app.use('/',filter);
app.use('/',section);
app.use('/',variant);

db.sync().then(()=>{
    app.listen(4000);
    console.log('Server started');
})
.catch(error=>{
    console.log(error);
})