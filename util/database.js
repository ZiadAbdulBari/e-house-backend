const Sequelize = require('sequelize');
 const pool = new Sequelize('node-ecommerce','root','admin',{
    host:'localhost',
    dialect:'mysql'
 })
 module.exports = pool;