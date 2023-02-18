import React, { useEffect, useState } from "react";
import {
  selectGame,
  getSingleGameAsync,
  resetGame,
  addToCart,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import Reviews from "../reviews/Reviews";
import Spinner from "../../Spinner";
import { Col, Row, Accordion, Button, Card } from "react-bootstrap";
import GameCarousel from "../../GameCarousel";
import "../../css/SingleGame.css"




const SingleGameShop = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const { number } = useParams()
  const steamGameData = game?.steam_game?.data


  useEffect(() => {
    if (number) {
      dispatch(getSingleGameAsync(number))
    }
  }, [number])

  useEffect(() => {
    return () => {
      dispatch(resetGame())
    }
  }, [])
  return (
    <div>
      <div style={{ color: "#66C0F4" }}>
        {
          !game.my_app ? <Spinner></Spinner> : (<>
            <Row>
              <h1>{game.my_app.game_name}</h1>
              <Col xs={12} md={8}>
                <GameCarousel></GameCarousel>
                <br />
                <Card style={{backgroundColor: "#1B2838", borderColor: "white"}}>
                  <Card.Body>
                    <Card.Title><h2>Buy {game.my_app.game_name}</h2></Card.Title>

                    <Card.Footer className='float-end'><span style={{ fontSize: "1.5em" }}>{game.my_app.price}$</span> <Button variant="success" onClick={() => dispatch(addToCart({ id: game?.my_app?.id, game_name: game?.my_app?.game_name, price: game?.my_app?.price }))}>Add to cart</Button></Card.Footer>
                  </Card.Body>
                </Card>
                <br />
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header >
                      <h2 style={{ color: "#66C0F4" }}>Detailed Description</h2>
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#1B2838" }}>
                      <p style={{ color: "#C7D5E0" }} dangerouslySetInnerHTML={{ __html: steamGameData.detailed_description }}></p>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
              <Col xs={6} md={4}>
                <div style={{ position: "relative", height: "400px", overflow: "hidden" }}>
                  <img
                    src={game?.my_app?.steam_image_api}
                    alt="snap"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", maxHeight: "80%" }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, padding: "10px" }}>
                    <p>Appid: {game.my_app.appid}</p>
                    <p>Developer: {game.my_app.developer}</p>
                    <p>Publisher: {game.my_app.publisher}</p>
                    <p>Genres: {game.my_app.genres?.map(({ genre_name }) => genre_name).join(", ")}</p>
                    <p>Price {game.my_app.price}$</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Reviews></Reviews>
          </>)
        }
      </div>
    </div >
  );
};

export default SingleGameShop;


