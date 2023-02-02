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
import LoginPage from "./features/authenticationTry/LoginPage";
import Register from "./features/authenticationTry/Register";
import Community from "./features/community/Profile";

const container = document.getElementById("root")!;
const root = createRoot(container);

// const Shop = React.lazy(() => import('./features/shop/Shop'));




root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="shop" element={<Shop />} />
            
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="login_page" element={<LoginPage />} />
            <Route path="register" element={<Register />} />
            <Route path="Community" element={<Community />} />

            <Route path="shop/game">
              <Route index element={<SingleGameShop />} />
              <Route path=":number" element={<SingleGameShop />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
