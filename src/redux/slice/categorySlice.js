import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "src/services/network";

export const getAllCategory = createAsyncThunk(
  "todo/fetchList",
  async (userId) => {
    const response = await get("/category/getAllCategory").then((res) => res);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
  },
  reducers: {},
  extraReducers: {
    [getAllCategory.pending]: (state, action) => {
      state.loading = "pending";
    },
    [getAllCategory.fulfilled]: (state, action) => {
      state.loading = "success";
      state.category.push(action.payload);
    },
    [getAllCategory.rejected]: (state, action) => {
      state.loading = "error";
      state.error = action.error;
    },
  },
});

export const { getAllCategory } = categorySlice.actions;

export default categorySlice.reducer;
