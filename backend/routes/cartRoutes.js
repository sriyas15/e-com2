import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controller/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All cart routes are protected
router.use(protect);

// Get current user's cart
router.get("/", getCart);

// Add an item to cart
router.post("/", addToCart);

// Update item quantity
router.put("/:productId", updateCartItem);

// Remove an item from cart
router.delete("/:productId", removeCartItem);

// Clear entire cart (optional, maybe after order checkout)
router.delete("/", clearCart);

export default router;
