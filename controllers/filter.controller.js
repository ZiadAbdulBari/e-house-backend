const Product = require("../models/product.model");
const { Op } = require("sequelize");
const SubCategory = require("../models/sub_category.model");
const Category = require("../models/category.model");
module.exports.search = async (req,res)=>{
    
    // const query = req.params
    console.log(req.params);
    const searchByTitle = req.params.search;
    const searchByCategory = req.params.category;
    const searchBySubcategory = req.params.subcategory;
    let result = {};
    let product = [];
    let subcategory = [];
    // let category=[];
    if(searchByTitle != 'false' && searchByCategory =='false' && searchBySubcategory =='false'){
        const search = searchByTitle
        console.log(search)
        product = await Product.findAll({where:{
            title:{
                [Op.like]:`%${search}%`
            }
        }})
        result.count = product.length;
        result.product = product;
        result.title = searchByTitle;
    }
    else if(searchByTitle =='false' && searchByCategory != 'false' && searchBySubcategory =='false'){
        console.log("====")
        product = await Product.findAll({where:{
            categoryId:searchByCategory
        }})
        subcategory = await SubCategory.findAll({where:{categoryId:searchByCategory}})
        const categoryTitle = await Category.findAll({where:{id:searchByCategory}});
        result.title = categoryTitle[0].category_name;
        result.count = product.length;
        result.product = product;
        result.subcategory = subcategory
    }
    else if(searchByTitle =='false' && searchByCategory =='false' && searchBySubcategory != 'false'){
        console.log("*****")
        product = await Product.findAll({where:{
            subcategoryId:req.params.subcategory
        }})
        // subcategory = await SubCategory.findAll({where:{categoryId:req.params.category}})
        // result.subcategory = subcategory;
        result.product = product;
    }
    res.status(200).json({
        status:200,
        result:result,
    })
    
}