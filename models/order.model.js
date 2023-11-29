const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const OrderItem = require('./order_item.model');
const Payment = require('./payment.model');
const User = require('./user.model');
const ShippingAddress = require('./shipping_address.model');
const Order = sequelize.define('order',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    order_number:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    status:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    estimated_delivery:{
        type:Sequqlize.DATE,
        allowNull:false,
    },
    total_price:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
})
Order.hasMany(Payment);
Order.belongsTo(ShippingAddress)
module.exports = Order;