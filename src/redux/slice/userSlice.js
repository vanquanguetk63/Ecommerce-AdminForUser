import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: 0,
    token: "",
    authorities: [],
    username: "",
    email: "",
  },
  reducers: {
    setUserToken: (state, action) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.authorities = action.payload.authorities;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const { setUserToken } = userSlice.actions;

export default userSlice.reducer;
