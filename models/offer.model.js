const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Product = require('./product.model');
const Offer = sequelize.define('offer',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    start_time:{
        type:Sequqlize.DATE,
        allowNull:false,
    },
    end_time:{
        type:Sequqlize.DATE,
        allowNull:false,
    },
    status:{
        type:Sequqlize.STRING,
        allowNull:false,
    }
})
Offer.hasMany(Product);
module.exports = Offer;