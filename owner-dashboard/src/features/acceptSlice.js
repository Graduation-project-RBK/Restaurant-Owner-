import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shows:false



};


const acceptSlice = createSlice({
    name: "accept",
    initialState,
    reducers: {

       

        setShows: (state, action) => {
            state.shows =        !state.shows
          },


    },
});

export const {
    setShows,
} = acceptSlice.actions;



export default acceptSlice.reducer;