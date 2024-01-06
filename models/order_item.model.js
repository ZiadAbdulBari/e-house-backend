const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
// const User = require('./user.model');
const Order = require('./order.model');
const Product = require('./product.model');
const ProductVariant = require('./product_variant.model');
const OrderItem = sequelize.define('orderItem',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
    title:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    image:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    price_at_purchase:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
    variants:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
OrderItem.belongsTo(ProductVariant);
OrderItem.belongsTo(Order);
module.exports = OrderItem;