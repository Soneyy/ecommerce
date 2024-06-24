import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../Components/common/BreadCrumb";

const Payment = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumb title="Payment gateway" />
      <div className="pb-10">
        <p>Payment gateway only applicable for Production build.</p>
        <Link to="/">
          <button className="w-52 h-10 bg-primeColor text-white text-lg mt-4 bg-secondary-300 hover:bg-secondary-200 duration-300">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Payment;
