import Sidebar from '../Components/Sidebar';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AllProduct from '../Components/home/AllProduct';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        console.log(res);
        setProducts(res.data); // Limit to 5 products
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar className="w-64 bg-gray-200 p-4 fixed h-half" />
      <div className="flex-1 ml-50 p-8">
        <div className="container mx-auto">
          <h1 className="text-center font-bold text-2xl mb-8">Products</h1>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </div>
          )}
          {!isLoading && products.length === 0 && <p>No products found</p>}
          {!isLoading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
              {products.map((el) => (
                <div key={el.id} className="p-4">
                  <AllProduct
                    _id={el.id}
                    title={el.title}
                    price={el.price}
                    images={el.images}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Store;
