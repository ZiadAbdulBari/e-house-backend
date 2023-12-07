const Product = require("../models/product.model");
const { Op } = require("sequelize");
const SubCategory = require("../models/sub_category.model");
const Category = require("../models/category.model");
const Section = require("../models/section.model");
module.exports.search = async (req,res)=>{
    const searchByTitle = req.params.search;
    const searchByCategory = req.params.category;
    const searchBySubcategory = req.params.subcategory;
    const searchBySection = req.params.section;
    let result = {};
    let product = [];
    let subcategory = [];
    // let category=[];
    if(searchByTitle != 'false' && searchByCategory =='false' && searchBySubcategory =='false' && searchBySection=='false'){
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
    else if(searchByTitle =='false' && searchByCategory != 'false' && searchBySubcategory =='false' && searchBySection=='false'){
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
    else if(searchByTitle =='false' && searchByCategory =='false' && searchBySubcategory != 'false' && searchBySection=='false'){
        product = await Product.findAll({where:{
            subcategoryId:searchBySubcategory
        }})
        const subcategoryTitle = await SubCategory.findAll({where:{id:searchBySubcategory}})
        // result.subcategory = subcategory;
        result.title = subcategoryTitle[0].subcategory_name;
        result.count = product.length;
        result.product = product;
    }
    else if(searchByTitle =='false' && searchByCategory =='false' && searchBySubcategory == 'false' && searchBySection != 'false'){
        
        product = await Product.findAll({where:{
            sectionId:searchBySection
        }})
        const sectionTitle = await Section.findAll({where:{id:searchBySection}})
        // result.subcategory = subcategory;
        result.title = sectionTitle[0].section_name;
        result.count = product.length;
        result.product = product;
    }
    return res.status(200).json({
        status:200,
        result:result,
    })
    
}