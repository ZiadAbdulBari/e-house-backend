const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const SubCategory = require('./sub_category.model');
const Category = sequelize.define('category',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    category_name:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    slug:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    image_url:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
Category.hasMany(SubCategory,{onDelete: 'CASCADE'});
module.exports = Category