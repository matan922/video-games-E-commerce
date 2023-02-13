import axios from "axios";
import { access } from "fs";
import { getConfig } from "../globalVariables/config";
import { getAllGames, getGenres, getSingleGame, order, steamGames } from "../globalVariables/endpoints";
import Game from "../models/Games";
import { temp } from "../models/PaginationInterfaces";
import Games, { CartInterface, orderData } from "../models/Games";



export function getGames(page: number, searchQuery: string) {
  return new Promise<{ data: temp }>((resolve) =>
    axios.get(getAllGames, { params: { limit: 10 , page: page ,search: searchQuery} }).then((res) => resolve({ data: res.data }))
  );
}



// export function searchGames(searchQuery: string) {
//   return new Promise<{ data: Games[] }>((resolve) =>
//     axios.get(getAllGames, { params: { search: searchQuery } }).then((res) => resolve({ data: res.data }))
//   );
// }

export function getGame(id: string) {
  return new Promise<{ data: Games }>((resolve) =>
    axios.get(getSingleGame + id + "/").then((res) => resolve({ data: res.data }))
  );
}

export function makeOrder(orderData: orderData, orderDetails: CartInterface[]) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(order, { "orderData": orderData, "orderDetails": orderDetails }, getConfig()).then((res) => resolve({ data: res.data }))
  );
}


export const steamAppidGame = async (appid: number) => {
  return new Promise<{ data: any }>((resolve) =>
    axios.get(steamGames + appid +"/").then((res) => resolve({ data: res.data[appid].data }))
  )
};



