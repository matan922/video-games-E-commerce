import axios from "axios";
import { access } from "fs";
import { getAllGames, getSingleGame } from "../../globalVariables/endpoints";
import Games from "../../models/Games";




export function getGames() {
  return new Promise<{ data: Games[] }>((resolve) =>
    axios.get(getAllGames).then((res) => resolve({ data: res.data }))
  );
}

export function getGame(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  }

  return new Promise<{ data: Games }>((resolve) =>
    axios.get(getSingleGame + id + "/", config).then((res) => resolve({ data: res.data }))
  );
}
