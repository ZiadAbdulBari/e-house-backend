const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Variant = require('./variant.model');
const CartItem = require('./cart_item.model');
const OrderItem = require('./order_item.model');
const ProductVariant = sequelize.define('productVariant',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    variant_value:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    stock:{
        type:Sequqlize.INTEGER,
        allowNull:true,
    },
})
// ProductVariant.hasOne(CartItem);
// ProductVariant.hasOne(OrderItem)
ProductVariant.belongsTo(Variant)
module.exports = ProductVariant;