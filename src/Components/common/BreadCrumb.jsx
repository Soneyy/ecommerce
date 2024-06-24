import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BreadCrumb() {
  const location = useLocation();

  // Do not render the breadcrumb if the current path is "/"
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="bg-[#F6F5FF]">
      <div className="container mx-auto">
        <div className="mb-8 py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 ">
          {/* text */}
          <h1 className="  text-primary font-bold font-Josefin text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            My Account
          </h1>
          <div className="font-Lato flex justify-left gap-3 text-base sm:text-lg md:text-xl">
            <Link to="/" className=" text-secondary-200 hover:text-primary">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/store" className="text-secondary-200 hover:text-primary">
              Store
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-secondary">My Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
