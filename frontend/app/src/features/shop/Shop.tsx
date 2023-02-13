import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  addToCart,
  selectLoading,
  selectNextPage,
  selectPrevPage,
  selectCount,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import Categories from "./Categories";
import BasicPagination from "../../BasicPagination";
import { selectCategories } from "../../Reducers/categoriesSlice";




const Shop = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectLoading);
  const games = useAppSelector(selectGameList);
  const nextPage = useAppSelector(selectNextPage);
  const prevPage = useAppSelector(selectPrevPage);
  const count = useAppSelector(selectCount)
  const [searchText, setSearchText] = useState("");
  const categories = useAppSelector(selectCategories)

  // --------------
  // console.log(count)
  // console.table(games.map(games => games.genres))
  // --------------



  useEffect(() => {
    const searchQuery = ""
    dispatch(getGamesAsync({ page: 1, searchQuery: searchQuery }))
  }, [dispatch]);


  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   let searchQuery = searchText;

  //   dispatch(getGamesAsync({ page: 1 }))
  // };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let searchQuery = searchText;

    dispatch(getGamesAsync({ page: 1, searchQuery }))
  };


  return (
    <div>
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
      <Row>
        <Col sm={4}>
          <Categories />
        </Col>
        <Col sm={8}>

          <div style={{ color: "#66C0F4" }}>
            {/* <SearchComponent asyncThunk={searchGamesAsync}></SearchComponent> */}
            <h1>Games list!</h1>
            <hr></hr>
            {games.map((game, i) => (
              <div key={i}>{game.game_name}
                <Button variant="info" onClick={() => navigate("/shop/game/" + game.id)}>Game Details</Button>
                <Button variant="success" onClick={() => dispatch(addToCart({ id: game.id, game_name: game.game_name, price: game.price }))}>Add to cart</Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <BasicPagination />



    </div >
  );
};



export default Shop;
