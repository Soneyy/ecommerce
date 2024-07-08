import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setReduxUser } from "./redux/slice/userSlice";
import RootComponent from "./Components/common/RootComponent";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Store from "./pages/store";

import Productpage from "./pages/all/Productpage";
import Product from "./pages/products/Product";
import Slug from "./pages/products/Slug";
import AllProduct from "./Components/home/AllProduct";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/Forgetpassword";
import Payment from "./pages/Payment";
import WishlistPage from "./pages/WishlistPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Admin";
import Users from "./pages/admin/Users";
import Orders from "./pages/admin/Orders";
import Products from "./pages/admin/Products";

import Aprofile from "./pages/admin/Aprofile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "store",
        element: <Store />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "forgetpassword",
        element: <ForgetPassword />,
      },
      {
        path: "paymentgateway",
        element: <Payment />,
      },
      {
        path: "wishlist",
        element: <WishlistPage/>,
      },
      {
        path: "about",
        element: <About/>,
      },
      {
        path: "contact",
        element: <Contact/>,
      },
      
      {
        path: "store/category/all",
        element: <AllProduct />,
      },
      
      {
        path: "category/all/:productpage",
        element: <Productpage />,
      },
      {
        path: "products",
        children: [
          {
            path: "",
            element: <Product />,
          },
          {
            path: ":slug",
            element: <Slug />,
          },
        ],
      },
    ],
  },
  {
    path: "admin",
   
    children: [
      {
        path: "",
        element: <Admin/>,
      },
      
      {
        path: "dashboard",
        element: <Admin/>,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders/>,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "profile",
        element: <Aprofile />,
      },
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setReduxUser(JSON.parse(user)));
      setIsLoading(false);
    } else if (token) {
      axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setReduxUser(res.data));
          localStorage.setItem("user", JSON.stringify(res.data)); // Store user data in localStorage
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          is loading....
        </div>
      ) : (
        <div className="font-lato">
          <RouterProvider router={router} />
        </div>
      )}
    </>
  );
}

export default App;
