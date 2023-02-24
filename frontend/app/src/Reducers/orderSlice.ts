import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    current,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import Game, { Genre, AddToCartAction, orderData, CartInterface, GameAndSteamData } from "../models/Games";
import { CreateAxiosDefaults } from "axios";
import { makeOrder } from "../APIs/orderAPI";


export interface ShopState {
    cartList: CartInterface[];
    order: any[];
    full_name: string;
    address: string;
    city: string;
    zip: string;
    total: number;
}

const initialState: ShopState = {
    cartList: [],
    order: [],
    full_name: "",
    address: "",
    city: "",
    zip: "",
    total: 0,
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

        updateFullName: (state,action) => {
            state.full_name = action.payload
            console.log(state.full_name)
        },

        updateZip: (state,action) => {
            state.zip = action.payload
        },

        updateAddress: (state,action) => {
            state.address = action.payload
        },

        updateCity: (state,action) => {
            state.city = action.payload
        },

        updateTotal: (state,action) => {
            
            state.total = action.payload
        },

    },

    extraReducers: (builder) => {
        builder
            .addCase(orderAsync.fulfilled, (state, action) => {
                state.order = action.payload;

            })
    },
});

export const { loadCart, addToCart, removeFromCart, removeAllFromCart, updateAddress, updateCity, updateFullName, updateTotal, updateZip } = orderSlice.actions;
export const selectCartList = (state: RootState) => state.order.cartList;
export const selectFullName = (state: RootState) => state.order.full_name;
export const selectZip = (state: RootState) => state.order.zip;
export const selectAddress = (state: RootState) => state.order.address;
export const selectCity = (state: RootState) => state.order.city;
export const selectTotal = (state: RootState) => state.order.total;


export default orderSlice.reducer;
