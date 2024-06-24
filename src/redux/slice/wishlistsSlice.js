// wishlistsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const wishlistsSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist(state, action) {
      state.wishlistItems.push(action.payload);
    },
    removeFromWishlist(state, action) {
      state.wishlistItems = state.wishlistItems.filter(
        item => item._id !== action.payload
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistsSlice.actions;
export default wishlistsSlice.reducer;
