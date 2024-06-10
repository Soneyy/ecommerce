import React from 'react'
import { Link,Outlet } from 'react-router-dom'

export default function RootElement() {
  return (
    <div>
        <header>
        <Link to="/">home</Link>
        <Link to="/store">store</Link>
        </header>
        <Outlet/>
        <footer>Footer</footer>
      
    </div>
  )
}
