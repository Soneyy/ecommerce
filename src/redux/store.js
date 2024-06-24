import { configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import cartReducer from './slice/cartSlice.'
import wishlistReducer from './slice/wishlistsSlice'


export default configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  }
})
