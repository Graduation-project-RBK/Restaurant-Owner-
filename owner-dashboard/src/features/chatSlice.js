import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentChat: null,
    currentChatName: ''



};


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {

        setCurrentChat: (state, action) => {
            state.currentChat = action.payload;
        },
        setCurrentChatName: (state, action) => {
            state.currentChatName = action.payload;
        },


    },
});

export const {
    setCurrentChat,
    setCurrentChatName
} = chatSlice.actions;



export default chatSlice.reducer;