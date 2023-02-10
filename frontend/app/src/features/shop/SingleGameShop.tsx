import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  selectGame,
  loadGame,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

const SingleGameShop = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);

  useEffect(() => {
    dispatch(loadGame())
  }, [dispatch])

  return (
    <div>
      <div style={{ color: "#66C0F4" }}>

        <h1>Game: {game.game_name}</h1>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>
          Genres: {game.genres?.map(({ genre_name }) => genre_name).join(", ")}
        </p>
        <p>Price {game.price}$</p>
      </div>
    </div>
  );
};

export default SingleGameShop;
