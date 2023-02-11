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
  steamAppidGameAsync,
  selectLoading,
  // selectCurrentPage,
  selectGamesPerPage,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SearchComponent from "../navbarFooter/SearchComponent";
import Game from "../../models/Games";
import Spinner from "../../Spinner";
import Pagination from "../../Pagination";

const Shop = () => {
  const gamesPerPage = useAppSelector(selectGamesPerPage)
  // const currentPage = useAppSelector(selectCurrentPage)

  const dispatch = useAppDispatch();
  const games = useAppSelector(selectGameList);
  const loading = useAppSelector(selectLoading);
  const cart = useAppSelector(selectCartList);
  const navigate = useNavigate();

  const goToGame = (selectedGame: Game) => {
    dispatch(getGameInfo(selectedGame))
    navigate("game/" + selectedGame.id + "/")
  }


  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    dispatch(getGamesAsync(currentPage));
  }, [dispatch,currentPage]);

  if (loading) {
    return (
      <Spinner></Spinner>
    )
  } else {
    return (

      <div>
        <Button onClick={() => dispatch(steamAppidGameAsync(10))}>Test</Button>


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
        <Button onClick={() => setCurrentPage(1)}>1</Button>
        <Button onClick={() => setCurrentPage(2)}>2</Button>
        <Button onClick={() => setCurrentPage(3)}>3</Button>
        <Button onClick={() => setCurrentPage(4)}>4</Button>
        <Button onClick={() => setCurrentPage(5)}>5</Button>
        <Button onClick={() => setCurrentPage(6)}>6</Button>
      </div >
    );
  };
}

export default Shop;
