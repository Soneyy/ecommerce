import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../Components/common/BreadCrumb";
import { addCartItem } from "../../redux/slice/cartSlice."; 
import { useDispatch } from "react-redux";
import { CiHeart } from "react-icons/ci";
import {FaInstagram, FaFacebook, FaTwitterSquare  } from "react-icons/fa";


export default function Slug() {
  const [product, setProduct] = useState(null); // Use null initially
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/categories/${params.slug}`)
      .then((res) => {
        setProduct(res.data); // Assuming the data is directly in res.data
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params.slug]);

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
        {product.image ? (
          <img
            src={product.image}
            className="w-[100%] self-stretch object-cover"
          />
        ) : (
          <p>No image available</p>
        )}

<div className="flex flex-grow flex-col gap-9 p-4">
<p className="font-semibold text-[#0D134E] text-[36px] md:text-[48px]">
            {product.name}
          </p>

          <p className="font-bold text-[#151875] text-[24px]">
            creationAt: {product.creationAt}
          </p>

          <p className="font-bold text-[#FB2E86] text-[24px] ">
            updatedAt: {product.updatedAt}
          </p>

          
         
          <div className="flex items-center gap-4 font-semibold text-[#151875]">
          <p>Share:</p>
            <div className="flex gap-2 p-2">
            <FaInstagram className="text-pink-500 text-[24px]" />
              <FaFacebook className="text-blue-600 text-[24px]" />
              <FaTwitterSquare className="text-blue-400 text-[24px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
