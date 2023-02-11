import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import Game, { Genre, AddToCartAction, orderData, CartInterface } from "../models/Games";
import { getGames, getGame, searchGames, makeOrder, steamAppidGame } from "../APIs/shopAPI";
import { CreateAxiosDefaults } from "axios";



export interface ShopState {
  gamesList: Game[];
  genre: Genre[]
  game: Game;
  cartList: CartInterface[]
  order: any[]
  steamAppid: {}
  message: string;
  loading: boolean;
  gamesPerPage: number;
  totalGames: number;
}

const initialState: ShopState = {
  gamesList: [],
  game: Object.create(null),
  genre: [],
  cartList: [],
  order: [],
  message: "",
  steamAppid: {},
  loading: false,
  gamesPerPage: 10,
  totalGames: 0
};

export const getGamesAsync = createAsyncThunk("shop/getGames", async (pageNumber: number) => {
  const response = await getGames(pageNumber);
  return response.data;
});

export const searchGamesAsync = createAsyncThunk("shop/searchGames", async (searchQuery: string) => {
  const response = await searchGames(searchQuery);
  return response.data;
});

export const orderAsync = createAsyncThunk("shop/makeOrder", async (data: { orderData: orderData, orderDetails: CartInterface[] }) => {
  const response = await makeOrder(data.orderData, data.orderDetails);
  return response.data;
});

export const steamAppidGameAsync = createAsyncThunk("shop/steamAppidGame", async (appid: number) => {
  const response = await steamAppidGame(appid);
  console.log(response)
  return response;
});

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {

    loadGame: (state) => {
      state.game = JSON.parse(localStorage.getItem('currentGame') as string)
    },

    loadCart: (state) => {
      if (localStorage.getItem('cart')) {
        state.cartList = JSON.parse(localStorage.getItem('cart') as string)
      }
    },

    addToCart: (state, action) => {

      let game = action.payload;
      let gameExistsInCart = state.cartList.find(g => g.id === game.id);
      if (!gameExistsInCart) {
        game = { ...game }
        state.cartList.push(game);
      }
      localStorage.setItem('cart', JSON.stringify(state.cartList) as string)
    },

    removeFromCart: (state, action) => {
      let game = action.payload;
      let gameExistsInCart = state.cartList.find(g => g.id === game.id);
      if (gameExistsInCart) {
        state.cartList = state.cartList.filter(g => g.id !== game.id);

        let cart = JSON.parse(localStorage.getItem("cart") as string);
        let filteredCart = cart.filter((g: Game) => g.id !== game.id);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        if (filteredCart.length <= 0) {
          localStorage.removeItem("cart");
        }
      }
    },

    removeAllFromCart: (state, action) => {
      state.cartList.splice(0, state.cartList.length);
      localStorage.removeItem("cart");
    },

    getGameInfo: (state, action) => {
      state.game = action.payload;
      localStorage.setItem('currentGame', JSON.stringify(action.payload))
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getGamesAsync.fulfilled, (state, action) => {
        // const indexOfLastGame = state.currentPage * state.gamesPerPage
        // const indexOfFirstGame = indexOfLastGame - state.gamesPerPage
        // const currentGames = action.payload.slice(indexOfFirstGame, indexOfLastGame)
        state.loading = false;
        state.gamesList = action.payload;
      })
      .addCase(getGamesAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(searchGamesAsync.fulfilled, (state, action) => {
        state.gamesList = action.payload;
      })
      .addCase(orderAsync.fulfilled, (state, action) => {
        state.order = action.payload;
        console.log(state.order)
      })
      .addCase(steamAppidGameAsync.fulfilled, (state, action) => {
        state.steamAppid = action.payload;
      })
  },
});

export const { loadCart, addToCart, removeFromCart, removeAllFromCart, getGameInfo, loadGame } = shopSlice.actions;
export const selectGameList = (state: RootState) => state.shop.gamesList;
export const selectGame = (state: RootState) => state.shop.game;
export const selectCartList = (state: RootState) => state.shop.cartList;
export const selectLoading = (state: RootState) => state.shop.loading;
// export const selectCurrentPage = (state: RootState) => state.shop.currentPage;
export const selectGamesPerPage = (state: RootState) => state.shop.gamesPerPage;
export const selectTotalGames = (state: RootState) => state.shop.totalGames;


export default shopSlice.reducer;
