import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import Game, { Genre, AddToCartAction, orderData, CartInterface, GameAndSteamData } from "../models/Games";
import {
  getGames,
  getGame,
} from "../APIs/shopAPI";
import { CreateAxiosDefaults } from "axios";


export interface ShopState {
  gamesList: Game[];
  currentPage: number;
  searchGame: string;
  genreSort: string;
  nextPage: string;
  prevPage: string;
  countOfGames: number;
  genre: Genre[]
  game: GameAndSteamData;
  steamAppid: any
  message: string;
  loading: boolean;
}

const initialState: ShopState = {
  gamesList: [],
  currentPage: 1,
  searchGame: "",
  genreSort: "",
  nextPage: "",
  prevPage: "",
  countOfGames: 0,
  game: Object.create(null),
  genre: [],
  message: "",
  steamAppid: {},
  loading: false,
};

export const getGamesAsync = createAsyncThunk("shop/getGames", async (data: { page: number, searchQuery: string, sortQuery: string }) => {
  const response = await getGames(data.page, data.searchQuery, data.sortQuery);
  return response.data;
});

export const getSingleGameAsync = createAsyncThunk("shop/getGame", async (id: string) => {
  const response = await getGame(id);
  return response.data;
});




export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    updateCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    updateSearchGame: (state, action: PayloadAction<string>) => {
      state.searchGame = action.payload;
    },

    updateGenreSort: (state, action: PayloadAction<string>) => {
      state.genreSort = action.payload;
      state.currentPage = 1;
    },
    resetGame: (state) => {
      state.game = {}
      // state.game = {steam_game: {}, my_app: JSON.parse(JSON.stringify(new Game()))}
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getGamesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.nextPage = action.payload.next
        state.prevPage = action.payload.previous
        state.countOfGames = action.payload.count
        state.gamesList = action.payload.results
      })
      .addCase(getGamesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSingleGameAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload
      })
  },
});

export const { resetGame, updateCurrentPage, updateSearchGame, updateGenreSort } = shopSlice.actions;
export const selectGameList = (state: RootState) => state.shop.gamesList;
export const selectGame = (state: RootState) => state.shop.game;
export const selectLoading = (state: RootState) => state.shop.loading;
export const selectNextPage = (state: RootState) => state.shop.nextPage;
export const selectPrevPage = (state: RootState) => state.shop.prevPage;
export const selectCount = (state: RootState) => state.shop.countOfGames;
export const selectSteamAppid = (state: RootState) => state.shop.steamAppid;
export const selectCurrentPage = (state: RootState) => state.shop.currentPage;
export const selectSearchGame = (state: RootState) => state.shop.searchGame;
export const selectGenreSort = (state: RootState) => state.shop.genreSort;


export default shopSlice.reducer;
