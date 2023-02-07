import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  getSingleGameAsync,
  selectGame,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Route, Routes, useParams } from "react-router";

const SingleGameShop = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const { number } = useParams();

  useEffect(() => {
    if (number != undefined) {
      dispatch(getSingleGameAsync(number));
    }
  }, [number]);

  return (
    <div>
      <hr></hr>
      <h1>Game: {game.game_name}</h1>
      <p>Developer: {game.developer}</p>
      <p>Publisher: {game.publisher}</p>
      <p>
        Genres: {game.genres?.map(({ genre_name }) => genre_name).join(", ")}
      </p>
      <p>Price {game.price}$</p>
    </div>
  );
};

export default SingleGameShop;
