import React from 'react';
import Breadcrumb from '../Components/common/BreadCrumb'; 
import about from "../assets/about.png";

export default function AboutUsPage() {
  return (
    <>
      <Breadcrumb title="About Us" />
      <div className="max-w-container mx-auto px-4 pt-8 pb-20 flex flex-col items-center">
        <h2 className="text-secondary-200 text-3xl font-bold mb-6 text-center">About Us</h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
          <div className="max-w-[600px] text-center lg:text-left">
            <p className="text-lg mb-4">
              Welcome to our store! We are committed to providing you with the best products and services.
            </p>
            <p className="text-lg mb-4">
              Our mission is to offer high-quality items at affordable prices, ensuring customer satisfaction and a great shopping experience.
            </p>
            <p className="text-lg">
              Thank you for choosing us as your trusted shopping destination. We look forward to serving you!
            </p>
          </div>
          <div className="max-w-[300px] mt-6 lg:mt-0">
            <img src={about} alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </>
  );
}
