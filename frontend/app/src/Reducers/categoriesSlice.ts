import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    current,
  } from "@reduxjs/toolkit";
import { getCategories } from "../APIs/categoriesAPI";
import { RootState } from "../app/store";
import { CatsState } from "../models/CategoriesInterface";



const initialState: CatsState = {
  categories: [],
  games: [],
  filtered: false
};
  

export const getCategoriesAsync = createAsyncThunk("categories/getCategories", async () => {
    const response = await getCategories();
    return response.data;
  });

  export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
      resetFilter: (state) => {
        state.filtered = false
      },
  
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCategoriesAsync.fulfilled, (state,action) => {
            state.categories = action.payload
        })
    },
  });
  

  export const selectCategories = (state: RootState) => state.categories.categories;
  export const selectFilteredGames = (state: RootState) => state.categories.games;
  export const selectIsFiltered = (state: RootState) => state.categories.filtered;

export default categoriesSlice.reducer;
