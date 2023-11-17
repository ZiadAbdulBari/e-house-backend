const Cart = require('../models/cart.model');
const Order = require('../models/order.model');
const OrderItem = require('../models/order_item.model');
const Payment = require('../models/payment.model');
const Product = require('../models/product.model');
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
            message:"Order place successfull"
        })
    }
}