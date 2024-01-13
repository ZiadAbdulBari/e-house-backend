const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const Profile = sequelize.define('profile',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    address:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    email:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    phone:{
        type:Sequqlize.STRING,
        allowNull:true,
    },
    image_url:{
        type:Sequqlize.STRING,
        allowNull:true,
    }
})
module.exports = Profile;