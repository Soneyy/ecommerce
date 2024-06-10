import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootComponent from './Components/common/RootComponent';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Store from './pages/store';
import AllProduct from './Components/home/AllProduct';
import Productpage from './pages/all/Productpage';
import Product from './pages/products/Product';
import Slug from './pages/products/Slug';
import SellerProducts from './pages/seller/Products';
import AddProducts from './pages/seller/AddProducts';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUser } from "./redux/slice/userSlice";
import { useState } from "react";
import Cloth from"./pages/clothes/Cloth"

const router = createBrowserRouter([
  {
    path: '',
    element: <RootComponent />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'store',
        element: <Store />,
        children: [
          {
            path: "category/all",
            element: <Store />,
          },
        ],
      },
      {
        path: 'category/all',
        children: [
          {
            path: ':productpage',
            element: <Productpage />,
          },
          
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <Product />,
          },
          {
            path: ':slug',
            element: <Slug />,
          },
        ],
      },
      {
        path: 'sellers',
        children: [
          {
            path: 'products',
            children: [
              {
                path: '',
                element: <SellerProducts />,
              },
              {
                path: 'add',
                element: <AddProducts />,
              },
            ],
          },
          {
            path: ':slug',
            element: <Slug />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('token');

    if (token) {
      axios
        .get('[GET] https://api.escuelajs.co/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setReduxUser(res.data));
          setIsLoading(false);
        })
        .catch((err) => {
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
