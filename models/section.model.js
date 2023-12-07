const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Product = require('./product.model');
const Section = sequelize.define('section',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    section_name:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
})

module.exports = Section;