import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { Login } from "./pages/Profile/Login.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { SignUp } from "./pages/Profile/SignUp.jsx";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about/:animeId",
        element: <AboutPage />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ],
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
