const Category = require("../models/category.model");
const SubCategory = require("../models/sub_category.model");

module.exports.makeCategory = async (req,res)=>{
    try{
        if(!req.method == 'post' || !req.method == 'POST'){
            return res.status(405).json({
                message:"Method is not allowed."
            })
        }
        const newCategory = {
            category_name:req.body.category_name,
            image_url:req.body.image_url,
            slug:req.body.slug
        }
        await Category.create(newCategory);
        return res.status(200).json({
            message:"New category added successfully."
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
module.exports.makeSubcategory = async (req,res)=>{
    try{
        if(!req.method == 'post' || !req.method == 'POST'){
            return res.status(405).json({
                message:"Method is not allowed."
            })
        }
        const newSubCategory = {
            parent:req.body.parent,
            subcategory_name:req.body.subcategory_name,
            categoryId:req.body.category_id,
            slug:req.body.slug
        }
        await SubCategory.create(newSubCategory);
        return res.status(200).json({
            message:"New sub-category added successfully."
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
module.exports.getCategory = async (req,res)=>{
    try{
        if(!req.method=='get' || !req.method=='GET'){
            return res.status(405).json({
                message:"Method is not allowed."
            })
        }
        const categories = await Category.findAll();
        // const subCategories = await SubCategory.findAll();
        // const cat = [];
        // categories.map(category=>{

        // })
        return res.status(200).json({
            status:200,
            categories:categories
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
module.exports.getSubCategory = async (req,res)=>{
    try{
        if(!req.method=='get' || !req.method=='GET'){
            res.status(405).json({
                message:"Method is not allowed."
            })
        }
        const subCategories = await SubCategory.findAll();
        return res.status(200).json({
            status:200,
            subcategories:subCategories
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}