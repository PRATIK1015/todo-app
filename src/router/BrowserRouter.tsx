import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import AccessDeniedPage from "../pages/AccessDeniedPage";
import PageNotFoundPage from "../pages/PageNotFound";
// import Test from "../components/test";
import Login from "../components/Login";
import Register from "../pages/Register";
import Home from "../components/Home";

const router = createBrowserRouter([
  
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        // children: [
        //   {
        //     index: true,
        //     element: <Home />,
        //   },
        //   {
        //     path: "playground",
        //     element: <Configurations />,
        //   },
         
        // ],
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/access-denied",
        element: <AccessDeniedPage />,
      },
    ],
  },
  
  {
    path: "*",
    element: <PageNotFoundPage />,
  },
]);

export default router;