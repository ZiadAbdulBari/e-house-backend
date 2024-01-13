const Sequqlize = require('sequelize');
const sequelize = require('../util/database');
const OrderItem = require('./order_item.model');
const Category = require('./category.model');
const SubCategory = require('./sub_category.model');
const Section = require('./section.model');
const ProductVariant = require('./product_variant.model');
const ProductImage = require('./product_image.model');
// const ProductVariant = require('./product_variant.model');
const Product = sequelize.define('product',{
    id:{
        type:Sequqlize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title:{
        type:Sequqlize.STRING,
        allowNull:false,
    },
    stock_quantity:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
    description:{
        type:Sequqlize.TEXT,
        allowNull:false,
    },
    aditional_data:{
        type:Sequqlize.TEXT,
        allowNull:true,
    },
    short_description:{
        type:Sequqlize.TEXT,
        allowNull:false,
    },
    price:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
    discount_price:{
        type:Sequqlize.INTEGER,
        allowNull:false,
    },
    suggested:{
        type:Sequqlize.BOOLEAN,
        allowNull:false,
    },
    
})
Product.hasMany(ProductVariant)
Product.hasMany(ProductImage)
Product.belongsTo(Category,{onDelete: 'CASCADE'});
Product.belongsTo(SubCategory,{onDelete: 'CASCADE'});
Product.belongsTo(Section)
Product.hasMany(OrderItem);
module.exports = Product;