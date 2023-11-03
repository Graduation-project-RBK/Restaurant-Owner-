import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  phoneNumber: 0,
  categories: [],
  city: "",
  mainImage: "",
  menuImages: [],
  extraImages: [],
  openingTime: "",
  closingTime: "",
  quota: 0,
  isNextDisabled: true,
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
    setCategories: (state, action) => {
      state.categories = action.payload;
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
    setIsNextDisabled: (state, action) => {
      state.isNextDisabled = action.payload;
    },
  },
});

export const {
  setName,
  setDescription,
  setPhoneNumber,
  setCategories,
  setCity,
  setMainImage,
  setMenuImages,
  setExtraImages,
  setOpeningTime,
  setClosingTime,
  setQuotes,
  setIsNextDisabled,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
