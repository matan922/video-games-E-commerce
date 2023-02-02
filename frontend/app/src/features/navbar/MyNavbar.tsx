import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import { logoutAsync, reset, selectIsLogged, selectUserName } from "../authenticationTry/authSlice";
import { MyToken } from '../../models/InterfaceAuth'
import Form from "react-bootstrap/form";
import { Dropdown } from "react-bootstrap";


function MyNavbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogged = useAppSelector(selectIsLogged);
  const username = useAppSelector(selectUserName);


  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/shop">
              All Games
            </Nav.Link>
            <Nav.Link as={Link} to="/community">
              Community
            </Nav.Link>
          </Nav>
          <Nav className="me-end">
            {isLogged ? <Navbar.Text>Welcome {username}</Navbar.Text> : (<Nav.Link as={Link} to="/register">Register</Nav.Link>)} &nbsp;
            {isLogged ? (<Button variant="danger" onClick={() => onLogout()}>Logout</Button>) : (<Nav.Link as={Link} to="/login_page">Login</Nav.Link>)}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}


export default MyNavbar;
