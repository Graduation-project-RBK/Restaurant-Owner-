import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  phoneNumber: "",
  category: "",
  city: "",
  mainImage: "",
  menuImages: [],
  extraImages: [],
  openingTime: "",
  closingTime: "",
  quotes: "",
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setMainImage: (state, action) => {
      state.mainImage = action.payload;
    },
    setMenuImages: (state, action) => {
      state.menuImages = action.payload;
    },
    setExtraImages: (state, action) => {
      state.extraImages = action.payload;
    },
    setOpeningTime: (state, action) => {
      state.openingTime = action.payload;
    },
    setClosingTime: (state, action) => {
      state.closingTime = action.payload;
    },
    setQuotes: (state, action) => {
      state.quotes = action.payload;
    },
  },
});

export const {
  setName,
  setDescription,
  setPhoneNumber,
  setCategory,
  setCity,
  setMainImage,
  setMenuImages,
  setExtraImages,
  setOpeningTime,
  setClosingTime,
  setQuotes,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
