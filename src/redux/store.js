import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slice/navSlice";

export default configureStore({
  reducer: {
    navigation: navReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
