import React, { useEffect, useState } from "react";
import { Col, Container, Form, Nav, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  orderAsync,
  removeAllFromCart,
  removeFromCart,
  selectCartList,
} from "../../Reducers/orderSlice";
import IconButton from "@mui/material/IconButton/IconButton";
import StyledBadge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { selectIsLogged } from "../../Reducers/authSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  selectAddress,
  selectCity,
  selectFullName,
  selectTotal,
  selectZip,
  updateAddress,
  updateCity,
  updateFullName,
  updateTotal,
  updateZip,
} from "../../Reducers/orderSlice";
import MyPaypalButton from "../mypaypal/MyPaypalButton";

// this is the code for the cart and payment process

const CartModal = ({ onTotalGamesChange }: any) => {
  const cart = useAppSelector(selectCartList);
  const isLogged = useAppSelector(selectIsLogged);
  const zip = useAppSelector(selectZip);
  const city = useAppSelector(selectCity);
  const full_name = useAppSelector(selectFullName);
  const total = useAppSelector(selectTotal);
  const address = useAppSelector(selectAddress);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // -------------------- Cart Modal ----------------------
  const [showCart, setShowCart] = useState(false);
  const [showBilling, setShowBilling] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);
  const handleCloseBilling = () => setShowBilling(false);
  const handleMoveToBilling = () => {
    if (localStorage.getItem("cart")) {
      setShowCart(false);
      setShowBilling(true);
    } else {
      toast.error("You need to add games first");
    }
  };

  const handleCloseBillingAndBuy = (e: any) => {
    setShowBilling(false);
    onSubmit(e);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (zip == "" || city == "" || (address == "" && full_name == "")) {
      toast.error("Fill all the fields please!");
    } else {
      dispatch(orderAsync({ orderDetails: cart }));
      localStorage.removeItem("cart");
      dispatch(removeAllFromCart(cart));
      toast.success("Enjoy your new games!");
    }
  };

  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += +item.price;
    });
    return Math.round((total + Number.EPSILON) * 100) / 100;
  };

  useEffect(() => {
    dispatch(updateTotal(getTotalQuantity()));
  }, [getTotalQuantity()]);

  return (
    <div>
      <Nav.Link>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={onTotalGamesChange} color="secondary">
            <ShoppingCartIcon
              style={{ color: "rgba(255, 255, 255, 0.55)" }}
              onClick={handleShowCart}
            />
          </StyledBadge>
        </IconButton>
      </Nav.Link>

      <Modal show={showCart} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <Modal.Title>Game Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart && cart.length ? (
            <>
              {cart.map((game) => (
                <div key={game.id}>
                  {game.game_name}, {game.price}$ &nbsp;
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch(
                        removeFromCart({
                          id: game.id,
                          game_name: game.game_name,
                          price: game.price,
                        })
                      )
                    }
                  >
                    Remove Game
                  </Button>
                  &nbsp;
                </div>
              ))}
              <br />
              <Button
                variant="danger"
                onClick={() => dispatch(removeAllFromCart(cart))}
              >
                Remove all from cart
              </Button>
            </>
          ) : (
            <div>Cart is empty</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div>Total: {total}$</div>
          <Button variant="secondary" onClick={handleCloseCart}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMoveToBilling}>
            Billing
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showBilling} onHide={handleCloseBilling}>
        <Modal.Header closeButton>
          <Modal.Title>Billing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Full Name"
                      autoFocus
                      id="full_name"
                      name="full_name"
                      value={full_name}
                      onChange={(e) => dispatch(updateFullName(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => dispatch(updateAddress(e.target.value))}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Modi'in"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => dispatch(updateCity(e.target.value))}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="7173221"
                    id="zip"
                    name="zip"
                    value={zip}
                    onChange={(e) => dispatch(updateZip(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseBilling}>
            Close
          </Button>
          {isLogged ? (
            <div>
              <Button variant="primary" onClick={handleCloseBillingAndBuy}>
                Buy! (without paypal)
              </Button>
              <MyPaypalButton />
            </div>
          ) : (
            <Button onClick={() => navigate("/login_page")}>
              Log in to purchase
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CartModal;
