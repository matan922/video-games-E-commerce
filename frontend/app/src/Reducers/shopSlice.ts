import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import Game, { Genre, AddToCartAction, orderData, CartInterface } from "../models/Games";
import { NextPage, PrevPage, temp } from "../models/PaginationInterfaces"
import {
  getGames,
  getGame,
  // searchGames,
  makeOrder,
  steamAppidGame,
} from "../APIs/shopAPI";
import { CreateAxiosDefaults } from "axios";



export interface ShopState {
  gamesList: Game[];
  nextPage: string;
  prevPage: string;
  countOfGames: number;
  genre: Genre[]
  game: Game;
  cartList: CartInterface[]
  order: any[]
  steamAppid: any
  message: string;
  loading: boolean;
}

const initialState: ShopState = {
  gamesList: [],
  nextPage: "",
  prevPage: "",
  countOfGames: 0,
  game: Object.create(null),
  genre: [],
  cartList: [],
  order: [],
  message: "",
  steamAppid: {},
  loading: false,
};

export const getGamesAsync = createAsyncThunk("shop/getGames", async (data:{page: number, searchQuery: string}) => {
  const response = await getGames(data.page, data.searchQuery);
  return response.data;
});

export const getSingleGameAsync = createAsyncThunk("shop/getGame", async (id: string) => {
  const response = await getGame(id);
  return response.data;
});

// export const searchGamesAsync = createAsyncThunk("shop/searchGames", async (searchQuery: string) => {
//   const response = await searchGames(searchQuery);
//   return response.data;
// });

export const orderAsync = createAsyncThunk("shop/makeOrder", async (data: { orderData: orderData, orderDetails: CartInterface[] }) => {
  const response = await makeOrder(data.orderData, data.orderDetails);
  return response.data;
});

export const steamAppidGameAsync = createAsyncThunk("shop/steamAppidGame", async (appid: number) => {
  const response = await steamAppidGame(appid);
  return response;
});


export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {

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
      .addCase(orderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;

      })
      .addCase(steamAppidGameAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.steamAppid = action.payload.data;
      })
  },
});

export const { loadCart, addToCart, removeFromCart, removeAllFromCart } = shopSlice.actions;
export const selectGameList = (state: RootState) => state.shop.gamesList;
export const selectGame = (state: RootState) => state.shop.game;
export const selectCartList = (state: RootState) => state.shop.cartList;
export const selectLoading = (state: RootState) => state.shop.loading;
export const selectNextPage = (state: RootState) => state.shop.nextPage;
export const selectPrevPage = (state: RootState) => state.shop.prevPage;
export const selectCount = (state: RootState) => state.shop.countOfGames;
export const selectSteamAppid = (state: RootState) => state.shop.steamAppid;


export default shopSlice.reducer;
