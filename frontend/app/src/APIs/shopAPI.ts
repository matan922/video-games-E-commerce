import axios from "axios";
import { access } from "fs";
import { getConfig } from "../globalVariables/config";
import { getAllGames, getGenres, getSingleGame, order, steamGames } from "../globalVariables/endpoints";
import Game, { GameAndSteamData } from "../models/Games";
import Games, { CartInterface, orderData } from "../models/Games";
import { GamePagination } from "../models/PaginationInterfaces";



export function getGames(page: number, searchQuery: string, sortQuery: string) {
  return new Promise<{ data: GamePagination }>((resolve) =>
    axios.get(getAllGames, { params: { page: page ,search: searchQuery, sort: sortQuery } }).then((res) => resolve({ data: res.data }))
  );
}

export function getGame(id: string) {
  return new Promise<{ data: GameAndSteamData }>((resolve) =>
    axios.get(getSingleGame + id + "/").then((res) => resolve({ data: res.data }))
  );
}

export function makeOrder(orderData: orderData, orderDetails: CartInterface[]) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(order, { "orderData": orderData, "orderDetails": orderDetails }, getConfig()).then((res) => resolve({ data: res.data }))
  );
}




