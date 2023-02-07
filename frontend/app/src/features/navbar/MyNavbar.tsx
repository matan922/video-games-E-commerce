import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect, useState } from "react";
import { logoutAsync, reset, selectIsLogged, selectUserName } from "../../Reducers/authSlice";
import { MyToken } from '../../models/InterfaceAuth'
import Form from "react-bootstrap/form";
import { Dropdown } from "react-bootstrap";
import { searchGamesAsync, selectCartList } from "../../Reducers/shopSlice";
import { searchProfilesAsync } from "../../Reducers/communitySlice";
import { BsCart } from 'react-icons/bs';
import CartModal from "./CartModal";


function MyNavbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLogged = useAppSelector(selectIsLogged);
  const username = useAppSelector(selectUserName);

  const cart = useAppSelector(selectCartList);
  const [ storageGame, setStorageGame ] = useState(null)

  const totalGames = () => {
    const initialValue = 0
    const total = cart.reduce((accumulator) => accumulator + 1, initialValue)
    console.log(total)
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
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            GAME STORE
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/shop">
              Store
            </Nav.Link>
            <Nav.Link as={Link} to="/community">
              Community
            </Nav.Link>
            {isLogged ? (<Nav.Link as={Link} to="/myprofile">My Profile</Nav.Link>) : null}
          </Nav>
          <Nav className="me-end">
            <CartModal /> {storageGame ? <Navbar.Text>{storageGame}</Navbar.Text> : null} &nbsp;&nbsp;
            {isLogged ? <Navbar.Text>Welcome {username}</Navbar.Text> : (<Nav.Link as={Link} to="/register">Register</Nav.Link>)} &nbsp;
            {isLogged ? (<Button variant="danger" onClick={() => onLogout()}>Logout</Button>) : (<Nav.Link as={Link} to="/login_page">Login</Nav.Link>)}
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}


export default MyNavbar;
