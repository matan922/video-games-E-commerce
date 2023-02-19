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
    makeOrder,
  } from "../APIs/shopAPI";
  import { CreateAxiosDefaults } from "axios";
  
  

export interface ShopState {
    cartList: CartInterface[]
    order: any[]
    
  }
  
  const initialState: ShopState = {
    cartList: [],
    order: [],
  };
  
  
  export const orderAsync = createAsyncThunk("shop/makeOrder", async (data: { orderData: orderData, orderDetails: CartInterface[] }) => {
    const response = await makeOrder(data.orderData, data.orderDetails);
    return response.data;
  });
  
  
  
  export const orderSlice = createSlice({
    name: "order",
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
        .addCase(orderAsync.fulfilled, (state, action) => {
          state.order = action.payload;
  
        })
    },
  });
  
  export const { loadCart, addToCart, removeFromCart, removeAllFromCart } = orderSlice.actions;
  export const selectCartList = (state: RootState) => state.order.cartList;
  
  
  export default orderSlice.reducer;
  