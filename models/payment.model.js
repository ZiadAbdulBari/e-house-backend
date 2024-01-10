const Order = require('./order.model');
const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Payment = sequelize.define('Payment',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    medium:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    payment_status:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
})
module.exports = Payment;