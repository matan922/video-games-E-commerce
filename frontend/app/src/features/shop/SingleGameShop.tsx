import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  selectGame,
  selectSteamAppid,
  steamAppidGameAsync,
  getSingleGameAsync,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import Reviews from "../reviews/Reviews";

const SingleGameShop = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const steamAppid = useAppSelector(selectSteamAppid);
  const { number } = useParams()

  useEffect(() => {
    if (number) {
      dispatch(getSingleGameAsync(number))
    }
  }, [dispatch])

  useEffect(() => {
    if (game.appid) {
      dispatch(steamAppidGameAsync(game.appid))
    }
  }, [dispatch])
  
  // console.log(steamAppid["header_image"])


  if (game.appid === steamAppid) { }
  return (
    <div>
      <div style={{ color: "#66C0F4" }}>
        <h1>Game: {game.game_name}</h1>
        <img src={steamAppid["header_image"]} alt="snap" />
        <p>Appid: {game.appid}</p>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Genres: {game.genres?.map(({ genre_name }) => genre_name).join(", ")}</p>
        <p>Price {game.price}$</p>
      </div>
      <Reviews></Reviews>
    </div>
  );
};

export default SingleGameShop;
