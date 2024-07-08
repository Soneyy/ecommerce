import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Product from "../Components/home/Product";
import Banner from "../Components/home/Banner";
import "../Components/home/Banner.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const banners = [
    {
      background: "bg-banner-2", // Ensure these match your CSS classes
      label: "Best ecommerce website",
      heading: "online business ",
      description: "Make every aspect of ecommerce easier for you and your customer.",
      
    },
    {
      background: "bg-banner-1", // Ensure these match your CSS classes
      label: "Best ecommerce website",
      heading: "online business",
      description: "Make every aspect of ecommerce easier for you and your customer.",
     
    },
    {
      background: "bg-banner-3", // Ensure these match your CSS classes
      label: "Best ecommerce website",
      heading: "online business",
      description: "Make every aspect of ecommerce easier for you and your customer.",
      
    },
  ];

  const productSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((res) => {
        setProducts(res.data.slice(0, 5)); // Limit to 5 products
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-half h-full  ">
      <Slider {...settings}>
        {banners.map((el, index) => (
          <Banner
            key={index}
            background={el.background}
            label={el.label}
            heading={el.heading}
            description={el.description}
            
          />
        ))}
      </Slider>

      <div className="container mx-auto sm:py-12 md:py-16 lg:py-20 xl:py-24 xxl:py-28">
        <h1 className="flex justify-center items-center font-bold mb-8 text-[34px] text-secondary-200">
          Categories
        </h1>

        {isLoading && (
          <>
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
            <Skeleton className="h-[400px]" />
          </>
        )}
        {!isLoading && products.length === 0 && <p>No products found</p>}
        {!isLoading && products.length > 0 && (
          <Slider {...productSettings} className="mt-4">
            {products.map((el) => (
              <div key={el.id} className="container mb-14 mt-16 font-bold">
                <Product _id={el.id} name={el.name} image={el.image} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
