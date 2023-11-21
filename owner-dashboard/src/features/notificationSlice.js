import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationBadge: false,
    messageNotificationBadge: false,



};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {

        setNotificationBadge: (state, action) => {
            state.notificationBadge = action.payload;
        },
        setMessageNotificationBadge: (state, action) => {
            state.messageNotificationBadge = action.payload;
        },




    },
});

export const {
    setNotificationBadge,
    setMessageNotificationBadge



} = notificationSlice.actions;



export default notificationSlice.reducer;