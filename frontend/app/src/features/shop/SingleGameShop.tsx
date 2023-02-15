import React, { useEffect, useState } from "react";
import {
  getGamesAsync,
  selectGameList,
  selectGame,
  selectSteamAppid,
  getSingleGameAsync,
  resetGame,
} from "../../Reducers/shopSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useParams } from "react-router-dom";
import Reviews from "../reviews/Reviews";
import Spinner from "../../Spinner";
import { Col, Row, Container } from "react-bootstrap";



const SingleGameShop = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const steamAppid = useAppSelector(selectSteamAppid);
  const { number } = useParams()

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
              <Col xs={12} md={8}>
                <h1>Game: {game.my_app.game_name}</h1>
              </Col>
              <Col xs={6} md={4}>
                <Container>
                  <img src={game?.my_app?.steam_image_api} alt="snap" />
                  <p>Appid: {game.my_app.appid}</p>
                  <p>Developer: {game.my_app.developer}</p>
                  <p>Publisher: {game.my_app.publisher}</p>
                  <p>Genres: {game.my_app.genres?.map(({ genre_name }) => genre_name).join(", ")}</p>
                  <p>Price {game.my_app.price}$</p>
                </Container>
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


