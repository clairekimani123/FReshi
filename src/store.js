import { configureStore } from '@reduxjs/toolkit';
import animalsReducer from './features/animalsSlice';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import ordersReducer from './features/ordersSlice';

export default configureStore({
  reducer: {
    animals: animalsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});