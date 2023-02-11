import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);



// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />}>

//             <Route path="shop/" element={
//               <React.Suspense fallback={<div onLoad={() => alert('hey')}>LOADINGGGGGGGGGGGGGGGGGGGGGGG</div>}>
//                 <Shop />
//               </React.Suspense>
//             }
//             />

//             <Route path="login_page/" element={<LoginPage />} />
//             <Route path="register/" element={<Register />} />
//             <Route path="register_staff/" element={<StaffRegister />} />
//             <Route path="community/" element={<Community />} />
//             <Route path="myprofile/" element={<MyProfile />} />


//             <Route path="shop/game/">
//               <Route index element={<SingleGameShop />} />
//               <Route path=":number" element={<SingleGameShop />} />
//             </Route>

//             <Route path="community/profile/">
//               <Route index element={<Profile />} />
//               <Route path=":number" element={<Profile />} />
//             </Route>

//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );


