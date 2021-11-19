import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./slice/navSlice";
import userReducer from "./slice/userSlice";

export default configureStore({
  reducer: {
    navigation: navReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
