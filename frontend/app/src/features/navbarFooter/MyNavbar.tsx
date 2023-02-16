import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import { logoutAsync, reset, selectIsLogged, selectUserName } from "../../Reducers/authSlice";
import {
  selectCartList
} from "../../Reducers/shopSlice";
import CartModal from "./CartModal";


function MyNavbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogged = useAppSelector(selectIsLogged);
  const username = useAppSelector(selectUserName);

  const cart = useAppSelector(selectCartList);
  const [storageGame, setStorageGame] = useState(0)

  const totalGames = () => {
    const initialValue = 0
    const total = cart.reduce((accumulator) => accumulator + 1, initialValue)
    setStorageGame(total)
  }

  useEffect(() => {
    totalGames()
  }, [cart])




  const onLogout = () => {
    dispatch(logoutAsync());
    dispatch(reset());
    navigate("/");
  };



  return (
    <div>
      <Navbar sticky="top" bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GAME STORE
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="shop/">
                Store
              </Nav.Link>
              <Nav.Link as={Link} to="community/">
                Community
              </Nav.Link>
              {isLogged ? (<Nav.Link as={Link} to="/myprofile/">My Profile</Nav.Link>) : null}
            </Nav>
            <Nav className="me-end">
              <CartModal onTotalGamesChange={storageGame} /> &nbsp;&nbsp;
              {isLogged ? <Navbar.Text>Welcome {username}</Navbar.Text> : (<Nav.Link as={Link} to="/register/">Register</Nav.Link>)} &nbsp;
              {isLogged ? (<Button variant="danger" onClick={() => onLogout()}>Logout</Button>) : (<Nav.Link as={Link} to="/login_page/">Login</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}


export default MyNavbar;
