const Cart = require("../models/cart.model");
const CartItem = require("../models/cart_item.model");
const Product = require("../models/product.model");
const ProductImage = require("../models/product_image.model");
module.exports.addToCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.id,
        total_price: parseInt(req.body.price) * parseInt(req.body.quantity),
      });
    } else {
      const totalprice =
        parseInt(cart.total_price) +
        parseInt(req.body.price) * parseInt(req.body.quantity);
      await Cart.update(
        { total_price: parseInt(totalprice) },
        { where: { userId: req.id } }
      );
    }
    const cartItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId: req.body.product_id,
      },
    });
    if (!cartItem) {
      const newCartItem = await CartItem.create({
        cartId: cart.id,
        productId: parseInt(req.body.product_id),
        quantity: req.body.quantity,
        productVariantId: req.body.productVariant_id,
        variants: req.body.variants,
      });
      res.status(200).json({
        status: 200,
        message: "Product added in cart",
      });
    } else {
      res.status(302).json({
        message: "Product already exist in cart",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
module.exports.getCartData = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.id });
    if (cart) {
      const totalPrice = cart?.total_price;
      const cartData = await CartItem.findAll({ cartId: cart.id });
      const id = cartData.map((data) => data.productId);
      const cartitem = await Product.findAll({
        where: { id: id },
        include: { model: ProductImage },
      });
      let cartProduct = [];
      cartitem.forEach((product) => {
        const item = {
          id: product.id,
          cartId: cart.id,
          cartItemId: cartData.filter((qu) => qu.productId == product.id)[0].id,
          stock_quantity: product.stock_quantity,
          cart_quantity: cartData.filter((qu) => qu.productId == product.id)[0]
            .quantity,
          title: product.title,
          image_url: product.productImages[0].image_url,
          price: product.price,
          discount_price: product.discount_price,
          categoryId: product.categoryId,
          subcategoryId: product.subcategoryId,
          productVariantId: cartData.filter(
            (qu) => qu.productId == product.id
          )[0].productVariantId,
          variants: cartData.filter((qu) => qu.productId == product.id)[0]
            .variants,
        };
        cartProduct.push(item);
      });
      return res.status(200).json({
        status: 200,
        cart_product: cartProduct,
        totalPrice: totalPrice,
      });
    } else {
      return res.status(200).json({
        status: 200,
        cart_product: [],
        totalPrice: 0,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports.quantityManagement = async (req, res) => {
  try {
    if (req.method != "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed",
      });
    }
    if (req.body.type == "increment") {
      await CartItem.increment(
        { quantity: 1 },
        { where: { id: req.body.cartItemId } }
      );
    } else {
      await CartItem.increment(
        { quantity: -1 },
        { where: { id: req.body.cartItemId } }
      );
    }
    return res.status(200).json({
      status: 200,
      message: "Quantity is changed.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};
module.exports.deleteCartProduct = async (req, res) => {
  try {
    if (req.method != "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed",
      });
    }
    const cartId = await Cart.findOne({ where: { userId: req.id } });
    const remaining = await CartItem.findAll({ where: { cartId: cartId.id } });
    const product = await Product.findOne({
      where: { id: req.body.productId },
    });
    const price =
      parseInt(cartId.total_price) -
      (parseInt(product.price) - parseInt(product.discount_price));
    await Cart.update({ total_price: price }, { where: { userId: req.id } });
    await CartItem.destroy({
      where: {
        id: req.body.cartItemId,
      },
    });
    if (remaining.length == 1) {
      await Cart.destroy({
        where: {
          userId: req.id,
        },
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Successfully deleted from cart.",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error?.message,
    });
  }
};
