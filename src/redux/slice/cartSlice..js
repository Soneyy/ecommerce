import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: [], // to simulate as not logged in
    // value: {"name":"ram"}
  },
  reducers: {
    addCardItem: (state, action) => {
      
      state.value = action.payload;
    },
    resetCart:(state, action) => {
        state.value=[]
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { addCardItem, resetCart } = cartSlice.actions;

export default cartSlice.reducer;