import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading: false,
    error: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteStart: (state) => {
            state.loading = true;
        },
        deleteSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        deleteFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null;
        }
    }
});

export const {signInStart, signInSuccess, signInFailure, updateUserStart,updateUserSuccess, updateUserFailure, deleteStart,deleteSuccess,deleteFailure, signOut} = userSlice.actions;
export default userSlice.reducer;
