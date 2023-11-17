const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const OrderItem = require('./order_item.model');
const Payment = require('./payment.model');
const User = require('./user.model');
const Order = sequelize.define('order',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    status:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    
    total_price:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
})
Order.hasMany(Payment);
module.exports = Order;