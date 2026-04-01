import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    selectedItems: [],
    lastAction: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        state.lastAction = {
          type: 'updated',
          item: action.payload,
        };
      } else {
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
        };
        state.items.push(newItem);
        state.lastAction = {
          type: 'added',
          item: action.payload,
        };
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    cleanCart: state => {
      state.items = [];
    },
    clearLastAction: state => {
      state.lastAction = null;
    },
    toggleSelectedItems: (state, action) => {
      const id = action.payload;
      if (state.selectedItems.includes(id)) {
        state.selectedItems = state.selectedItems.filter(i => i !== id);
      } else {
        state.selectedItems.push(id);
      }
    },
    selectAllItems: state => {
      state.selectedItems = state.items.map(item => item.id);
    },
    clearAllItems: state => {
      state.selectedItems = [];
    },
    removeMultipleFromCart: (state, action) => {
      const idsToRemove = action.payload;

      state.items = state.items.filter(item => !idsToRemove.includes(item.id));

      state.selectedItems = state.selectedItems.filter(
        id => !idsToRemove.includes(id),
      );
    },
  },
});

export const {addToCart, removeFromCart,incrementQuantity, decrementQuantity, 
    setCart, cleanCart, clearLastAction, toggleSelectedItems, 
    selectAllItems, clearAllItems, removeMultipleFromCart} = cartSlice.actions;
export default cartSlice.reducer;