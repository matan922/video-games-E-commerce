import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  addToCart,
  selectCurrentPage,
  selectSearchGame,
  updateSearchGame,
  selectGenreSort,
  selectLoading,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import Categories from "./Categories";
import Spinner from "../../Spinner";
import BasicPaginationGames from "../../BasicPaginationGames";
import { toast } from "react-toastify";


const Shop = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const games = useAppSelector(selectGameList);
  const currentPage = useAppSelector(selectCurrentPage)
  const searchGame = useAppSelector(selectSearchGame)
  const genreSort = useAppSelector(selectGenreSort)
  const loading = useAppSelector(selectLoading)




  useEffect(() => {
    const searchQuery = ""
    dispatch(getGamesAsync({ page: currentPage, searchQuery: searchQuery, sortQuery: genreSort }))
  }, [dispatch, genreSort]);

  // console.log(games.map(game => game.appid))

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(getGamesAsync({ page: currentPage, searchQuery: searchGame, sortQuery: genreSort }))
  };

  return (
    <div>
      {
        loading ? <Spinner></Spinner> :
          <div>
            <Navbar expand="lg" bg="dark" variant="dark">
              <Container>
                <Form className="d-flex" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchGame}
                    onChange={(e) => dispatch(updateSearchGame(e.target.value))}
                    aria-label="Search"
                  />
                  <Button type="submit" variant="outline-success">Search</Button>
                </Form>
              </Container>
            </Navbar>
            <Row>
              <Col sm={3} style={{ color: "#66C0F4" }}>
                <h1>Categories</h1>
                <hr></hr>

                <Categories />
              </Col>
              <Col sm={9}>

                <div style={{ color: "#66C0F4" }}>
                  <h1>Games list!</h1>
                  <hr></hr>
                  <Row xs={1} md={3} className="g-4">
                    {games.map((game, i) =>
                      <div key={game.id}>
                        <Col>
                          <Card className="rounded-0 card-shop  " style={{ backgroundColor: "#1B2838" }}>
                            <Card.Img className="rounded-0" src={game.steam_image_api} />
                            <Card.Body>
                              <Card.Text>{game.game_name}</Card.Text>
                              <Button className="center" variant="outline-info" onClick={() => navigate("/shop/game/" + game.id)}>Game Details</Button>
                              <Button className="center mt-3" variant="outline-success" onClick={() => {
                                dispatch(addToCart({ id: game.id, game_name: game.game_name, price: game.price }))
                                toast.success(game.game_name + " added to cart.")
                              }}>Add to cart</Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </div>)}
                  </Row>
                  <BasicPaginationGames />
                </div>
              </Col>

            </Row>
          </div>

      }
    </div >
  );
};



export default Shop;


