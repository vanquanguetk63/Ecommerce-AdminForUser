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
    removeUserToken: (state) => {
      localStorage.removeItem("user");
      state.id = "";
      state.token = "";
      state.authorities = [];
      state.username = "";
      state.email = "";
    },
  },
});

export const { setUserToken, removeUserToken } = userSlice.actions;

export default userSlice.reducer;
