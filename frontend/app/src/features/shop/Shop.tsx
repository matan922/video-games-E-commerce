import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  selectGame,
  selectCartList,
  addToCart,
  // searchGamesAsync,
  removeFromCart,
  getGameInfo,
  steamAppidGameAsync,
  selectLoading,
  // selectCurrentPage,
  // selectGamesPerPage,
  selectNextPage,
  selectPrevPage,
  selectCount,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import SearchComponent from "../navbarFooter/SearchComponent";
import Game from "../../models/Games";
import Spinner from "../../Spinner";
import { toast } from "react-toastify";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import MyPagination from "../../MyPagination";



const Shop = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoading);
  const games = useAppSelector(selectGameList);
  const nextPage = useAppSelector(selectNextPage);
  const prevPage = useAppSelector(selectPrevPage);
  const count = useAppSelector(selectCount)

  const [offsetPage, setOffsetPage] = useState(0)
  const [searchText, setSearchText] = useState("");

  // --------------
  // console.log(count)
  // console.log(games)
  // --------------


  const goToGame = (selectedGame: Game) => {
    dispatch(getGameInfo(selectedGame))
    navigate("game/" + selectedGame.id + "/")
  }

  useEffect(() => {
    const searchQuery = ""
    dispatch(getGamesAsync({ offset: offsetPage, searchQuery }))
  }, [dispatch, offsetPage]);


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let offset = 0
    let searchQuery = searchText;
    console.log(games.length)

    dispatch(getGamesAsync({ offset, searchQuery }))
  };


  if (loading) {
    return (
      <Spinner></Spinner>
    )
  } else {
    return (
      <div>
        <Button onClick={() => dispatch(steamAppidGameAsync(10))}>Test</Button>

        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                aria-label="Search"
              />
              <Button type="submit" variant="outline-success">Search</Button>
            </Form>
          </Container>
        </Navbar>

        <div style={{ color: "#66C0F4" }}>
          {/* <SearchComponent asyncThunk={searchGamesAsync}></SearchComponent> */}
          <h1>Games list!</h1>
          <hr></hr>
          {games.map((game, i) => (
            <div key={i}>{game.game_name}
              <Button variant="info" onClick={() => goToGame(game)}>Game Details</Button>
              <Button variant="success" onClick={() => dispatch(addToCart({ id: game.id, game_name: game.game_name, price: game.price }))}>Add to cart</Button>
            </div>
          ))}
        </div>
        <MyPagination />
      </div >
    );
  };
}

export default Shop;
