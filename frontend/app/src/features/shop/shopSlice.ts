import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import Game, {Genre} from "../../models/Games";
import { getGames, getGame } from "./shopAPI";

export interface ShopState {
  gamesList: Game[];
  genre: Genre[]
  game: Game;
}

const initialState: ShopState = {
  gamesList: [],
  game: Object.create(null),
  genre: []
};

export const getGamesAsync = createAsyncThunk("shop/getGames", async () => {
  const response = await getGames();
  return response.data;
});

export const getSingleGameAsync = createAsyncThunk("shop/getGame", async (id:string) => {
  const response = await getGame(id);
  return response.data;
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getGamesAsync.fulfilled, (state, action) => {
      state.gamesList = action.payload;
    });
    builder.addCase(getSingleGameAsync.fulfilled, (state, action) => {
      state.game = action.payload;
    });
  },
});

export const {} = shopSlice.actions;
export const selectGameList = (state: RootState) => state.shop.gamesList;
export const selectGame = (state: RootState) => state.shop.game;

export default shopSlice.reducer;
