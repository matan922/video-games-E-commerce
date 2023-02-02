import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import MyNavbar from "./features/navbar/MyNavbar";
import Navbar from "./features/navbar/MyNavbar";
import Shop from "./features/shop/Shop";
import SingleGameShop from "./features/shop/SingleGameShop";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { isLoggedOn, isLoggedOff, selectIsLogged } from "./features/authenticationTry/authSlice";
import Button from "react-bootstrap/esm/Button";

function App() {
  const dispatch = useAppDispatch()
  const islogged = useAppSelector(selectIsLogged)
  console.log(islogged)
  
  const myToken = JSON.parse(localStorage.getItem('token') as string)
  const accessToken = myToken?.access
useEffect(() => {
  if (accessToken) {
    dispatch(isLoggedOn())
  } if (accessToken == null) {
    dispatch(isLoggedOff())
  }
}, [])

  return (
    <div>
      <MyNavbar></MyNavbar>
      <Outlet></Outlet>
      <ToastContainer/>
    </div>
  );
}

export default App;
