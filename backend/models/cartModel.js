import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          default: 0,
        },
        numOfReviews: {
          type: Number,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
          default: 1,
        },
        countInStock: {
          type: Number,
          required:true
        },
      },
    ],
    itemPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to calculate prices
cartSchema.pre("save", function (next) {
  this.itemPrice = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Shipping: free if itemPrice > 499, otherwise 40
  this.shippingPrice = this.itemPrice > 499 ? 0 : 40;

  // GST 18%
  this.taxPrice = Number((0.18 * this.itemPrice).toFixed(2));

  // Total
  this.totalPrice = this.itemPrice + this.shippingPrice + this.taxPrice;

  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
