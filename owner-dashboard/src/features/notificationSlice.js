import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationBadge: false,



};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

        setNotificationBadge: (state, action) => {
            state.notificationBadge = action.payload;
        },




    },
});

export const {
    setNotificationBadge,



} = notificationSlice.actions;



export default notificationSlice.reducer;