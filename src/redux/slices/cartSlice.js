import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items:[],
        lastAction: null
    },
    reducers:{
        addToCart: (state, action)=>{
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if(existingItem){
                existingItem.quantity += action.payload.quantity;
                state.lastAction = {
                    type:'updated',
                    item:action.payload
                };
            }
            else{
                state.items.push(action.payload);
                state.lastAction = {
                    type: 'added',
                    item: action.payload
                };
            }
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        cleanCart: (state)=>{
            state.items = [];
        },
        clearLastAction: (state) => {
            state.lastAction = null;
        }
    }
});

export const {addToCart, removeFromCart, cleanCart, clearLastAction} = cartSlice.actions;
export default cartSlice.reducer;