const ProductImage = require("../models/product_image.model");
const Product = require("../models/product.model");
const ProductVariant = require("../models/product_variant.model");
const Variant = require("../models/variant.model");
const cloudinary = require("../util/cloudinary.config");
module.exports.addProduct = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const product = {
      title: req.body.title,
      stock_quantity: parseInt(req.body.stock),
      description: req.body.description,
      price: parseInt(req.body.price),
      categoryId: parseInt(req.body.category_id),
      subcategoryId: parseInt(req.body.subcategory_id),
      short_description: req.body.short_description,
      aditional_data: req.body.aditional_data,
      discount_price: parseInt(req.body.discount_price),
      suggested: req.body.suggested,
    };
    const createProduct = await Product.create(product);
    const images = req.files;
    images.forEach(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const uploadImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "essential",
      });
      await ProductImage.create({
        image_url: uploadImage.url,
        productId: createProduct.id,
      });
    });
    // console.log(processImage);
    // await Promise.all(processImage);
    return res.status(200).json({
      status: 200,
      message: "Product added successfull",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports.addVariantValue = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    await ProductVariant.create({
      variant_value: req.body.variant_value,
      stock: parseInt(req.body.stock),
      variantId: parseInt(req.body.variant_id),
      productId: parseInt(req.body.product_id),
    });
    return res.status(200).json({
      status: 200,
      message: "Product variant added.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductVariant,
        },
        {
          model: ProductImage,
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports.getProductDetails = async (req, res) => {
  try {
    const products = await Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: ProductVariant,
        },
        {
          model: ProductImage,
        },
      ],
    });
    const allVariant = await Variant.findAll();
    await Promise.all(allVariant);
    let arr = [];
    allVariant.forEach((variant) => {
      let newArr = [];
      let newObj = {
        title: "",
        values: [],
      };
      products.productVariants.forEach((v_value) => {
        if (variant.id == v_value.variantId) {
          newArr.push(v_value);
        }
      });
      if (newArr.length > 0) {
        newObj.title = variant.variant_name;
        newObj.values = newArr;
        arr.push(newObj);
      }
    });
    return res.status(200).json({
      status: 200,
      products: products,
      variant: arr,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
