import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    current,
  } from "@reduxjs/toolkit";
import { getCategories } from "../APIs/categoriesAPI";
import { RootState } from "../app/store";
import { Cats } from "../models/CategoriesInterface";


const initialState: Cats = {
  categories: []
};
  

export const getCategoriesAsync = createAsyncThunk("categories/getCategories", async () => {
    const response = await getCategories();
    return response.data;
  });
  

  export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategoriesAsync.fulfilled, (state,action) => {
            state.categories = action.payload
        })
    },
  });
  

  export const selectCategories = (state: RootState) => state.categories.categories;


export default categoriesSlice.reducer;
