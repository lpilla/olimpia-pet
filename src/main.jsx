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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </ThemeProvider>
);
