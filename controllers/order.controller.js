const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const OrderItem = require('../models/order_item.model');
const Payment = require('../models/payment.model');
const Product = require('../models/product.model');
const ShippingAddress = require('../models/shipping_address.model');
module.exports.placeOrder = async (req,res)=>{
    try{
        const order = await Order.create({
            status:"pending",
            total_price:req.body.total_price,
            userId:req.id
        })
        const orderedProduct = req.body.products;
        orderedProduct.map(async (product)=>{
            const newProduct = {
                quantity:parseInt('1'),
                title:product.title,
                image:product.image_url,
                price_at_purchase:product.price,
                productId:product.id,
                orderId:order.id
            }
            await OrderItem.create(newProduct)
            await Product.increment({stock_quantity:-parseInt(1)},{productId:product.id})
        })
        await Payment.create({
            orderId:order.id,
            medium:req.body.medium,
            history:{
                'amount':req.body.total_price
            }
        })
        await Cart.destroy({
            where: {
              userId: req.id
            },
        });
        return res.staus(200).json({
            message:"Order place successfull"
        })
    }
    catch(error){
        return res.status(500).json({
            message:error
        })
    }
}
module.exports.addShippingAddress = async (req,res)=>{
    try{
        if(req.method != 'POST'){
            return res.status(405).json({
                status:405,
                message:"Methods is not allowed."
            })
        }
        const newShippingAddress = {
            receiver_name: req.body.name,
            receiver_phone: req.body.phone,
            receiver_address: req.body.address,
            receiver_email: req.body.email,
            is_gift: req.body.gift,
            userId:req.id,
        }
        await ShippingAddress.create(newShippingAddress);
        return res.status(200).json({
            status:200,
            message: "New shipping address added."
        })
    }
    catch(error){
        return res.status(500).json({
            status:500,
            message:error
        })
    }
}
module.exports.getShippingAddress = async (req,res)=>{
    try{
        if(req.method != 'GET'){
            return res.status(405).json({
                status:405,
                message:"Methods is not allowed."
            })
        }
        const allAddress = await ShippingAddress.findAll({usedId:req.id});
        return res.status(200).json({
            status:200,
            shipping_address:allAddress
        })
    }
    catch(error){
        return res.status(500).json({
            status:500,
            message:error
        })
    }
}
module.exports.deleteShippingAddress = async (req,res)=>{
    try{
        if(req.method != 'POST'){
            return res.status(405).json({
                status:405,
                message:"Methods is not allowed."
            })
        }
        await ShippingAddress.destroy({id:req.body.id},{where:{usedId:req.id}});
        return res.status(200).json({
            status:200,
            message:"Address has been deleted."
        })
    }
    catch{
        return res.status(500).json({
            status:500,
            message:error
        })
    }
}