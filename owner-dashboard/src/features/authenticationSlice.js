import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setRole: (state, action) => {
      state.token = action.payload;
    },
    clearRole: (state) => {
      state.role = null;
    },
  },
});

export const { setToken, clearToken, setRole, clearRole } =
  authenticationSlice.actions;
export default authenticationSlice.reducer;
