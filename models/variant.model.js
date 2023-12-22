const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Variant = sequelize.define('variant',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    variant_name:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
})
module.exports = Variant