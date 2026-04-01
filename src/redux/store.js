import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
    reducer:{
        cart: cartReducer,
        auth: authReducer,
        products: productsReducer,
        orders: orderReducer,
    },
});

export default store;