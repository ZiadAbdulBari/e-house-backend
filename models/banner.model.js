const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Banner = sequelize.define('banner',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    iamge_url:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
module.exports = Banner;