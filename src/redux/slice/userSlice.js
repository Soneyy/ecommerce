// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    value: null, // or initial user data structure
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.value = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.value = null;
    },
    setReduxUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout, setReduxUser } = userSlice.actions;

export default userSlice.reducer;
