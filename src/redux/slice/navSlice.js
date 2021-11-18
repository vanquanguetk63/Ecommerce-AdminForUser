import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: "navigation",
  initialState: {
    sidebarShow: true,
  },
  reducers: {
    setNavigation: (state, action) => {
      state.sidebarShow = !state.sidebarShow;
    },
  },
});

export const { setNavigation } = navSlice.actions;

export default navSlice.reducer;
