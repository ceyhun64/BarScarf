import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/slices/authSlice'
import productReducer from '../features/slices/productSlice'
import categoryReducer from '../features/slices/categorySlice'
import favoriteReducer from '../features/slices/favoriteSlice'
import cartReducer from '../features/slices/cartSlice'
import userDetailsReducer from '../features/slices/userDetailsSlice'
import userReducer from '../features/slices/userSlice'
import paymentReducer from '../features/slices/paymentSlice'
import orderReducer from '../features/slices/orderSlice'
import subscribeReducer from '../features/slices/subscribeSlice'
import sliderReducer from '../features/slices/sliderSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    userDetails: userDetailsReducer,
    user: userReducer,
    payment: paymentReducer,
    order: orderReducer,
    subscribe: subscribeReducer,
    slider: sliderReducer
  },
})