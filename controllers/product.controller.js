const Product = require("../models/product.model");

module.exports.addProduct = async (req, res) => {
    try{
        const product = {
          title: req.body.title,
          image_url: req.body.image_url,
          stock_quantity: parseInt(req.body.stock),
          description: req.body.description,
          price: parseInt(req.body.price),
          categoryId:parseInt(req.body.category_id),
          subcategoryId:parseInt(req.body.subcategory_id),
          short_description:req.body.short_description,
          aditional_data:req.body.aditional_data,
          discount_price:parseInt(req.body.discount_price),
          suggested:req.body.suggested,
        };
        const createProduct = await Product.create(product);
        return res.status(200).json({
            status:200,
            message: "Product added successfull",
        });
    }
    catch(error){
        return res.status(500).json({
            status:500,
            message: error,
        });
    }
};
module.exports.getProduct = async (req, res) => {
    try{
        const products = await Product.findAll();
        return res.status(200).json({
            status:200,
            products: products,
        });
    }
    catch(error){
        return res.status(500).json({
            status:500,
            message: error,
        });
    }
};
module.exports.getProductDetails = async (req,res)=>{
    console.log(req.params);
    try{
        const products = await Product.findOne({where:{id:req.params.id}});
        console.log(products)
        return res.status(200).json({
            status:200,
            products: products,
            // category:category
        });
    }
    catch(error){
        return res.status(500).json({
            status:500,
            message: error,
        });
    }
}
