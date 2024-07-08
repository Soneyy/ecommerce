import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
    },
    resetWishlist: (state) => {
      state.wishlistItems = [];
    },
    addToCart: (state, action) => {
      
      console.log("Item added to cart:", action.payload);
    }
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist, addToCart } = wishlistSlice.actions;

export default wishlistSlice.reducer;
