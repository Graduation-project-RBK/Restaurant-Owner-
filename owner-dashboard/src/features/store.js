import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authenticationReducer from "./authenticationSlice.js";
import restaurantReducer from "./restaurantSlice.js";

const authPersistConfig = {
  key: "token",
  storage,
};

const restaurantPersistConfig = {
  key: "restaurant",
  storage,
};

const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authenticationReducer
);
const persistedRestaurantReducer = persistReducer(
  restaurantPersistConfig,
  restaurantReducer
);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    restaurant: persistedRestaurantReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
