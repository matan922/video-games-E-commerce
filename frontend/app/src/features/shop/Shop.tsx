import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  getSingleGameAsync,
  selectGame,
  selectCartList,
  addToCart,
  searchGamesAsync,
  removeFromCart,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SearchComponent from "../navbar/SearchComponent";

const Shop = () => {


  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGameList);
  const cart = useAppSelector(selectCartList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getGamesAsync());
  }, [dispatch]);




  return (
    <div>
      <SearchComponent asyncThunk={searchGamesAsync}></SearchComponent>
      <h1>Games list!</h1>
      <hr></hr>
      {games.map((games, i) => (
        <div key={i}>{games.game_name}
          <Button variant="info" onClick={() => navigate("game/" + games.id + "/")}>Game Details</Button>
          <Button variant="success" onClick={() => dispatch(addToCart({ id: games.id, game_name: games.game_name, price: games.price }))}>Add to cart</Button>
        </div>
      ))}
    </div>
  );
};

export default Shop;
