const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Cart = require('./cart.model');
const Product = require('./product.model');
const ProductVariant = require('./product_variant.model');
const CartItem = sequelize.define('cartItem',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    // email:{
    //     type:Sequqlize.STRING,
    //     allowNull:false,
    // },
    quantity:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
    variants:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
CartItem.belongsTo(ProductVariant);
CartItem.belongsTo(Product);
module.exports = CartItem;