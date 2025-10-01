import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart from backend
export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, { getState }) => {
  const { auth } = getState();
  const config = { headers: { Authorization: `Bearer ${auth.userInfo.token}` } };
  const { data } = await axios.get("/api/v1/cart", config);
  return data;
});

// Add item to cart in backend
export const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async ({ productId, quantity }, { getState }) => {
    const { auth } = getState();
    const config = { headers: { Authorization: `Bearer ${auth.userInfo.token}` } };
    const { data } = await axios.post("/api/v1/cart", { productId, quantity }, config);
    return data;
  }
);

// Update quantity
export const updateCartItemQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, quantity }, { getState }) => {
    const { auth } = getState();
    const config = { headers: { Authorization: `Bearer ${auth.userInfo.token}` } };
    const { data } = await axios.put(`/api/v1/cart/${productId}`, { quantity }, config);
    return data;
  }
);

// Remove item
export const removeCartItemFromServer = createAsyncThunk(
  "cart/removeItem",
  async (productId, { getState }) => {
    const { auth } = getState();
    const config = { headers: { Authorization: `Bearer ${auth.userInfo.token}` } };
    const { data } = await axios.delete(`/api/v1/cart/${productId}`, config);
    return data;
  }
);

// Clear cart
export const clearCartServer = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState }) => {
    const { auth } = getState();
    const config = { headers: { Authorization: `Bearer ${auth.userInfo.token}` } };
    const { data } = await axios.delete("/api/v1/cart", config);
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    status: "idle", // loading status
    error: null,
  },
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items || [];
        state.itemPrice = action.payload.itemPrice || 0;
        state.shippingPrice = action.payload.shippingPrice || 0;
        state.taxPrice = action.payload.taxPrice || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload.items || [];
        state.itemPrice = action.payload.itemPrice || 0;
        state.shippingPrice = action.payload.shippingPrice || 0;
        state.taxPrice = action.payload.taxPrice || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action) => {
        state.cartItems = action.payload.items || [];
        state.itemPrice = action.payload.itemPrice || 0;
        state.shippingPrice = action.payload.shippingPrice || 0;
        state.taxPrice = action.payload.taxPrice || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(removeCartItemFromServer.fulfilled, (state, action) => {
        state.cartItems = action.payload.items || [];
        state.itemPrice = action.payload.itemPrice || 0;
        state.shippingPrice = action.payload.shippingPrice || 0;
        state.taxPrice = action.payload.taxPrice || 0;
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(clearCartServer.fulfilled, (state, action) => {
        state.cartItems = [];
        state.itemPrice = 0;
        state.shippingPrice = 0;
        state.taxPrice = 0;
        state.totalPrice = 0;
      });
  },
});

export default cartSlice.reducer;

