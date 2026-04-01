import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    currentUser: null,
    isAuthenticated: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signup: (state, action) => {
            const {name, email, password} = action.payload;

            const emailExists = state.users.find(u => u.email === email);
            if(emailExists){
                state.error = "User Already Exists";
                return ;
            }
            const newUser = {name, email, password};
            state.users.push(newUser);
            state.error = null;
        },

        login : (state, action) => {
            const {email, password} = action.payload;
            state.error = null;
            const user = state.users.find(u => u.email === email && u.password === password);

            if(!user){
                state.error = "Invalid Credentials";
                state.isAuthenticated = false;
                return;
            }
            // const user = {email, password};
            state.currentUser = user;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        updateProfile: (state, action) => {
            const updatedData = action.payload;
            if(state.currentUser){
                state.currentUser={
                    ...state.currentUser,
                    ...updatedData,
                }
                state.users = state.users.map(user =>
                    user.email === state.currentUser.email
                    ? state.currentUser 
                    : user
                );
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});
export const {signup, login, logout, updateProfile, clearError} = authSlice.actions;
export default authSlice.reducer;