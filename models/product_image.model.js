const Product = require("./product.model")
const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const ProductImage = sequelize.define('productImage',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    image_url:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
module.exports = ProductImage