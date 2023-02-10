import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleGameShop from "./features/shop/SingleGameShop";
// import Login from "./features/authentication/Login";
import Shop from "./features/shop/Shop";
// import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./features/authentication/LoginPage";
import Register from "./features/authentication/Register";
import Community from "./features/community/Community";
import Profile from "./features/community/Profile";
import MyProfile from "./features/community/MyProfile";
import StaffRegister from "./features/authentication/StaffRegister";

const container = document.getElementById("root")!;
const root = createRoot(container);

// const Shop = React.lazy(() => import('./features/shop/Shop'));




root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="shop/" element={<Shop />} />
            <Route path="login_page/" element={<LoginPage />} />
            <Route path="register/" element={<Register />} />
            <Route path="register_staff/" element={<StaffRegister />} />
            <Route path="community/" element={<Community />} />
            <Route path="myprofile/" element={<MyProfile />} />


            <Route path="shop/game/">
              <Route index element = {<SingleGameShop />} />
              <Route path=":number" element = {<SingleGameShop />} />
            </Route>

            <Route path="community/profile/">
              <Route index element={<Profile />} />
              <Route path=":number" element={<Profile />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
