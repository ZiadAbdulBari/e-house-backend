const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Order = require('./order.model');
const User = require('./user.model');
const ShippingAddress = sequelize.define('shippingaddress',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    receiver_name:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    receiver_phone:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    receiver_address:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    receiver_email:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    is_gift:{
        type:Sequqlize.BOOLEAN,
        allowNull:true,
    },
    message:{
        type:Sequqlize.TEXT,
        allowNull:true,
    }
})
module.exports = ShippingAddress;