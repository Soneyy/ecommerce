import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "../../Components/common/BreadCrumb";
import { addCardItem } from "../../redux/slice/cartSlice.";
import { useDispatch } from "react-redux";


export default function Productpage() {
  const [product, setProduct] = useState(null); // Use null initially
  const [loading, setLoading] = useState(true); // Loading state
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${params.slug}`)
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
            src={product.images}
            className="w-[100%] self-stretch object-cover"
          />
        ) : (
          <p>No image available</p>
        )}

        <div className="flex flex-grow flex-col gap-4 p-4">
          <p className="font-semibold text-[#0D134E] md:text-[36px]">
            {product.title}
          </p>

          <p className="font-bold text-[#151875]">
           {product.price}
          </p>

          <p className="font-bold text-[#FB2E86] ">
            {product.description}
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => dispatch(addCardItem(product))}
              className="bg-primary  hover:bg-pink-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  w-40"
            >
              Add To cart
            </button>
          </div>

         
          <div className="flex gap-4 font-semibold text-[#151875]">
            <p>Share </p>
            <div className="flex gap-2 p-2">
              <img src="/assets/fbicon.png" alt="" />
              <img src="/assets/instaLogo.png" alt="" />
              <img src="/assets/twitterLogo.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
