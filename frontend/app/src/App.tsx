import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import MyNavbar from "./features/navbarFooter/MyNavbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedOn, isLoggedOff } from "./Reducers/authSlice";
import { loadCart } from "./Reducers/shopSlice";
import Footer from "./features/navbarFooter/Footer";
import { Container } from "react-bootstrap";
import Profile from "./features/community/Profile";
import SingleGameShop from "./features/shop/SingleGameShop";
import MyProfile from "./features/community/MyProfile";
import Community from "./features/community/Community";
import React from "react";
import LoginPage from "./features/authentication/LoginPage";
import StaffRegister from "./features/authentication/StaffRegister";
import Register from "./features/authentication/Register";
import ErrorFallback from "./ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary"
const Shop = React.lazy(() => import('./features/shop/Shop'));


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

  useEffect(() => {
    dispatch(loadCart())
  }, [dispatch])



  return (
    <div >
      <MyNavbar></MyNavbar>
      <div style={{ backgroundColor: "#1B2838" }}>
        <Container style={{ backgroundColor: "#2A475E", paddingBottom: "3rem" }}>
          <Routes>

            <Route path="shop/" element={
              <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { }}>
                <React.Suspense fallback={<div>LOADING...</div>}>
                  <Shop />
                </React.Suspense>
              </ErrorBoundary>
            } />

            <Route path="login_page/" element={<LoginPage />} />
            <Route path="register/" element={<Register />} />
            <Route path="register_staff/" element={<StaffRegister />} />
            <Route path="community/" element={<Community />} />
            <Route path="myprofile/" element={<MyProfile />} />

            <Route path="shop/game/">
              <Route index element={<SingleGameShop />} />
              <Route path=":number" element={<SingleGameShop />} />
            </Route>

            <Route path="community/profile/">
              <Route index element={<Profile />} />
              <Route path=":number" element={<Profile />} />
            </Route>

          </Routes>
        </Container>
      </div>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;




// return (
//   <div >
//     <MyNavbar></MyNavbar>
//     <div style={{ backgroundColor: "#1B2838" }}>
//       <Container style={{ backgroundColor: "#2A475E", paddingBottom: "3rem"}}>
//         <Outlet></Outlet>
//       </Container>
//     </div>
//     <Footer></Footer>
//     <ToastContainer />
//   </div>
// );
// }

// export default App;
