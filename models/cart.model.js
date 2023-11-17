const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const CartItem = require('./cart_item.model');
const Cart = sequelize.define('cart',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    total_price:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    }
})
Cart.hasMany(CartItem,{onDelete: 'CASCADE'});
module.exports = Cart;