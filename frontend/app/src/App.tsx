import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import MyNavbar from "./features/navbar/MyNavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedOn, isLoggedOff } from "./Reducers/authSlice";
import Spinner from "./Spinner";
import { loadCart, selectCartList } from "./Reducers/shopSlice";

function App() {
  const dispatch = useAppDispatch()
  

  const myToken = JSON.parse(localStorage.getItem('token') as string)
  const accessToken = myToken?.access
  useEffect(() => {
    if (accessToken) {
      dispatch(isLoggedOn())
    } if (accessToken == null) {
      dispatch(isLoggedOff())
    }
  }, [dispatch])

  useEffect(()=> {
    dispatch(loadCart())
  }, [dispatch])


  return (
    <div>
      <MyNavbar></MyNavbar>
      <Outlet></Outlet>
      <ToastContainer />
    </div>
  );
}

export default App;
