import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    orders: [],
};
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers:{
        addOrder:(state, action) => {
            state.orders.unshift(action.payload);
        },
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        updateOrderStatus: (state, action) => {
            const {id, status} = action.payload;
            const order = state.orders.find(o => o.id === id);
            if(order) order.status = status;
        },
    },
});
export const {addOrder, setOrders, updateOrderStatus} = orderSlice.actions;
export default orderSlice.reducer;