import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../Components/common/BreadCrumb";
import { addCartItem } from "../../redux/slice/cartSlice."; 
import { useDispatch } from "react-redux";
import { FaInstagram, FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { Useauth } from "../../Components/hook/Useauth"; // Ensure the path is correct

export default function Productpage() {
  const [product, setProduct] = useState(null); // Use null initially
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoggedIn } = Useauth(); // Get auth status

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${params.productpage}`)
      .then((res) => {
        console.log(res.data); // Log the response data
        setProduct(res.data); // Assuming the data is directly in res.data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.productpage]);

  if (loading) {
    return <p>Loading...</p>; // Loading message
  }

  if (!product) {
    return <p>Product not found</p>; // Handle case where product is not found
  }

  return (
    <>
      <BreadCrumb title="Product Details" />
      <div className="container grid gap-4 p-6 shadow-xl md:grid-cols-2">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]} // Access the first image in the images array
            className="w-[100%] self-stretch object-cover"
            alt={product.title} // Adding alt attribute for accessibility
          />
        ) : (
          <p>No image available</p>
        )}

        <div className="flex flex-grow flex-col gap-4 p-4">
          <p className="font-semibold text-[#0D134E] text-[36px] md:text-[48px]">
            {product.title}
          </p>

          <p className="font-bold text-[#151875] text-[24px]">
            Price:${product.price}
          </p>

          <p className="font-bold text-[#FB2E86] text-[18px]">
            {product.description}
          </p>

          {isLoggedIn && ( // Only show the button if the user is logged in
            <div className="flex items-start justify-start gap-3">
              <button
                onClick={() => dispatch(addCartItem(product))}
                className="bg-secondary-300 hover:bg-secondary-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40"
              >
                Add To Cart
              </button>
            </div>
          )}

          <div className="flex items-center gap-4 font-semibold text-[#151875]">
            <p>Share:</p>
            <div className="flex items-center gap-2">
              <FaInstagram className="text-pink-500 text-[32px]" />
              <FaFacebook className="text-blue-600 text-[32px]" />
              <FaTwitterSquare className="text-blue-400 text-[32px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
