import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    token: "",
    authorities: [],
    username: "",
    email: "",
  },
  reducers: {
    setUserToken: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
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
