import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: false,
    role: '',
    hasRestaurant: 'false',
    isPremium: false,


};


const ownerSlice = createSlice({
    name: "owner",
    initialState,
    reducers: {

        setToken: (state, action) => {
            state.token = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setHasRestaurant: (state, action) => {
            state.hasRestaurant = action.payload;
        },
        setIsPremium: (state, action) => {
            state.isPremium = action.payload;
        },




    },
});

export const {
    setToken,
    setRole,
    setHasRestaurant,
    setShow,
    setIsPremium



} = ownerSlice.actions;



export default ownerSlice.reducer;