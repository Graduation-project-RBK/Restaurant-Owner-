import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  phoneNumber: "",
  categories: [],
  city: "",
  mainImage: null,
  menuImages: [],
  extraImages: [],
  openingTime: "",
  closingTime: "",
  reservationQuota: "",
  lat: null,
  lng: null,
  isNextDisabled: true,
  token: "",
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
    setReservationQuota: (state, action) => {
      state.reservationQuota = action.payload;
    },
    setLatitude: (state, action) => {
      state.lat = action.payload;
    },
    setLongitude: (state, action) => {
      state.lng = action.payload;
    },
    setIsNextDisabled: (state, action) => {
      state.isNextDisabled = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
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
  setReservationQuota,
  setLatitude,
  setLongitude,
  setIsNextDisabled,
  setToken,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
