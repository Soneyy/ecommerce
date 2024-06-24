import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [],
  },
  reducers: {
    addCartItem: (state, action) => {
      const existingItem = state.value.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.value.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const cartItem = state.value.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    resetCart: (state) => {
      state.value = [];
    },
    removeCartItem: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addCartItem, updateCartItemQuantity, resetCart ,removeCartItem} = cartSlice.actions;

export default cartSlice.reducer;
