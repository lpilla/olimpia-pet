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
import { RegisterProvider } from "./context/registerContext";
import { DatabaseProvider } from "./context/databaseContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <RegisterProvider>
          <DatabaseProvider>
            <RouterProvider router={router} />
          </DatabaseProvider>
        </RegisterProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
