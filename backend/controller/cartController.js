import asyncHandler from "../middleware/asyncHandler.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";


export const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(200).json({
      items: [],
      itemPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    });
  }

  res.status(200).json(cart);
});


export const addToCart = asyncHandler(async (req, res) => {
  const { productId,quantity } = req.body;

  if (!productId || !quantity) {
    res.status(400);
    throw new Error("Product and quantity are required");
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  const itemData = {
    product: product._id,
    name: product.name,
    image: product.images[0]?.url || "",
    rating: product.ratings || 0,
    numOfReviews: product.numOfReviews || 0,
    price: product.price,
    quantity,
    countInStock: product.stock
  };

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [itemData] });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push(itemData);
    }

    await cart.save();
  }

  res.status(200).json(cart);
});


export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error("Product not in cart");
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  res.status(200).json(cart);
});


export const removeCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product && item.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json(cart);
});


export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.items = [];
    await cart.save();
  }

  res.status(200).json({
    items: [],
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  });
});
