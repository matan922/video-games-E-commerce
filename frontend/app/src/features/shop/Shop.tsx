import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  getSingleGameAsync,
  selectGame,
} from "./shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Shop = () => {
  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGameList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGamesAsync());
  }, [dispatch]);


  return (
    <div>
      <h1>Games list!</h1>
      <hr></hr>
      {games.map((games, i) => (
        <div key={i}>{games.game_name}<Button variant="info" onClick={() => navigate("game/"+games.id)}>Game Details</Button></div>
      ))}
    </div>
  );
};

export default Shop;
