import React from 'react'
import Header from '../Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import FooterBottom from '../footer/FooterBottom'

export default function RootComponent() {
  return (

   <>
   <Header/>
   <Outlet/>
   <Footer/>
   <FooterBottom/>
   </>
  )
}
