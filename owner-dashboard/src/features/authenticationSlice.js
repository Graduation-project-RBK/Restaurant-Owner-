import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearToken } = authenticationSlice.actions;
export default authenticationSlice.reducer;
