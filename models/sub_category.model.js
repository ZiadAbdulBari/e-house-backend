const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Product = require('./product.model');
const SubCategory = sequelize.define('subcategory',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    parent:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    subcategory_name:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    slug:{
        type:Sequqlize.STRING,
        allowNull:true,
    }
})
// SubCategory.hasMany(Product)
module.exports = SubCategory