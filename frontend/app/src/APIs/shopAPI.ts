import axios from "axios";
import { access } from "fs";
import { getConfig } from "../globalVariables/config";
import { getAllGames, getSingleGame, order } from "../globalVariables/endpoints";
import Games, { CartInterface, orderData } from "../models/Games";



export function getGames() {
  return new Promise<{ data: Games[] }>((resolve) =>
    axios.get(getAllGames).then((res) => resolve({ data: res.data }))
  );
}

export function searchGames(searchQuery: string) {
  return new Promise<{ data: Games[] }>((resolve) =>
    axios.get(getAllGames, { params: { search: searchQuery } }).then((res) => resolve({ data: res.data }))
  );
}

export function getGame(id: string) {
  return new Promise<{ data: Games }>((resolve) =>
    axios.get(getSingleGame + id + "/").then((res) => resolve({ data: res.data }))
  );
}

export function makeOrder(orderData:orderData, orderDetails:CartInterface[]) {
  return new Promise<{ data: any }>((resolve) =>
    axios.post(order, {"orderData": orderData, "orderDetails": orderDetails}, getConfig()).then((res) => resolve({ data: res.data }))
  );
}


