const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Cart = require('./cart.model');
const Order = require('./order.model');
const User =sequelize.define('user',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
User.hasOne(Cart);
User.hasMany(Order);
module.exports = User;