import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import App from "./App";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import Home from "./pages/home/index";
import { UserProvider } from "./context/UserContext";
import { DatabaseProvider } from "./context/DatabaseContext";
import Profile from "./pages/profile/index";
import HomeVenditore from "./pages/home_venditore/HomeVenditore.jsx";
import LandingPage from "./pages/landingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/venditore",
    element: <HomeVenditore />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/landingPage",
    element: <LandingPage />,
  },
  {
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <UserProvider>
      <DatabaseProvider>
        <RouterProvider router={router} />
      </DatabaseProvider>
    </UserProvider>
  </ThemeProvider>
);
