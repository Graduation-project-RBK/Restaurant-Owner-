import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show:false



};


const declineSlice = createSlice({
    name: "decline",
    initialState,
    reducers: {

       

        setShow: (state, action) => {
            state.show =        !state.show
          },


    },
});

export const {
    setShow,
} = declineSlice.actions;



export default declineSlice.reducer;