import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Product from"../Components/home/Product"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const productSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of slides to show
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
        console.log(res);
        setProducts(res.data.slice(0, 5)); // Limit to 5 products
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container py-[116px] sm:py-[130px] md:py-[148px] lg:py-[166px] xl:py-[188px] xxl:py-[210px]">
        <h1 className="flex justify-center items-center font-bold mb-8">Categories</h1>

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
            {products.map((el) => {
              return (
                <div key={el.id} className="container mb-14 mt-16"> {/* Add padding for gap */}
                  <Product
                    _id={el.id}
                    name={el.name} // 
                    creationAt={el.creationAt}
                    image={el.image} // 
                  />
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </>
  );
}
