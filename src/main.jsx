import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/authContext";
import Home from "./pages/Home/Home";
import Missing from "./pages/Missing/Missing";
import Adminlogin from "./pages/Adminlogin/Adminlogin";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import {MoviesProvider} from "./context/moviesContext";
import Movie from "./pages/Movie/Movie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Signin />,
    errorElement: <Missing />,
  },
  {
    path: "/admin",
    element: <Adminlogin />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/homepage",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/movie/:id",
    element: <Movie />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <MoviesProvider>
        <RouterProvider router={router} />
      </MoviesProvider>
    </AuthProvider>
  </>
);
