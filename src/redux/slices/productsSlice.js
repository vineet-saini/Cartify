import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    categories: [],
    selectedCategory: 'All',
    search: '',
    loading: false,
    refreshing: false,
    error: null,
    lastFetched: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        fetchProductsSuccess: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.refreshing = false;
            state.lastFetched = Date.now();

            const categories = [
                'All',
                ...new Set(action.payload.map(p => p.category)),
            ];
            state.categories = categories;
        },
        fetchProductsFailure: (state, action) => {
            state.loading = false;
            state.refreshing = false;
            state.error = action.payload;
        },
        setCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },

        setSearch: (state, action) => {
            state.search = action.payload;
        },

        setRefreshing: (state, action) => {
            state.refreshing = action.payload;
        },

    },
});

export const {fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, setCategory, setSearch, setRefreshing} = productsSlice.actions;
export default productsSlice.reducer;