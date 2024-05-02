// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import RootElement from "./Components/RootElement";
// import Home from './pages/Home';
// import './App.css'
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
 
// } from "react-router-dom";

// function App() {
//   const router = createBrowserRouter([
    
//     {
//       path:"/",
//       element:<RootElement/>,
//       children:[
        
//           {
//             path: "/",
//             element: (
              
//                 <h1>HomenPage</h1>
             
//             ),
//           },
//           {
//             path: "about",
//             element: <h1> About page</h1>
//           },
        
//       ]
//     }

//   ]);
//   return(
//     <RouterProvider router={router} />
  
//   )
 
 
  

// }

// export default App
import React from 'react'
import Home from './pages/Home'
import Login from './pages/Login'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import RootComponent from './Components/common/RootComponent';
import Product from './pages/products/Product';
import Slug from './pages/products/Slug';
import Signup from './pages/Signup';
import Cart from './pages/Cart';

const router = createBrowserRouter([
  {
    path: "",
    element: <RootComponent/>,
    children:[
      {
        path:"",
        element: <Home/>
      },
      {
        path: "Login",
        element: <Login/>
      },
      {
        path: "signup",
        element: <Signup/>
      },
      {
        path: "cart",
        element: <Cart/>
      },
      {
        path: "products",
        
        children:[
          {
            path:"",
            element: <Product/>
          },
          {
            path:"slug",
            element: <Slug/>
          },
        ]
      },
    ]
  },

]);



function App ()  {
  return (
    <div className='font-lato'> 
 <RouterProvider router={router} />
    </div>
  )
}

export default App
