import { createSlice } from '@reduxjs/toolkit';
import { resetWishlist } from './wishlistsSlice';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    users: [], 
    value: null, 
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
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    removeUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
  },
});

export const { login, logout, setReduxUser, updateUser,removeUser } = userSlice.actions;

export const logoutUser = () => dispatch => {
  dispatch(logout());
  dispatch(resetWishlist());
};

export default userSlice.reducer;
