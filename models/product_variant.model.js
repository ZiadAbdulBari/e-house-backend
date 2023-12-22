const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
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
module.exports = ProductVariant;