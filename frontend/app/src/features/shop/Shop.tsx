import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  selectGame,
  selectCartList,
  addToCart,
  searchGamesAsync,
  removeFromCart,
  getGameInfo,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SearchComponent from "../navbarFooter/SearchComponent";
import Game from "../../models/Games";

const Shop = () => {


  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGameList);
  const cart = useAppSelector(selectCartList);
  const navigate = useNavigate();

  const goToGame = (selectedGame: Game) => {
    dispatch(getGameInfo(selectedGame))
    navigate("game/"+ selectedGame.id + "/")
  }

  useEffect(() => {
    dispatch(getGamesAsync());
  }, [dispatch]);




  return (
    <div>
      <div style={{ color: "#66C0F4" }}>

        <SearchComponent asyncThunk={searchGamesAsync}></SearchComponent>
        <h1>Games list!</h1>
        <hr></hr>
        {games.map((game, i) => (
          <div key={i}>{game.game_name}
            <Button variant="info" onClick={() => goToGame(game)}>Game Details</Button>
            <Button variant="success" onClick={() => dispatch(addToCart({ id: game.id, game_name: game.game_name, price: game.price }))}>Add to cart</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
