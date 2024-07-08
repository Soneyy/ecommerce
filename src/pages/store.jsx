import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AllProduct from "../Components/home/AllProduct";
import Pagination from "../Components/common/Pagination";
import { addCartItem } from "../redux/slice/cartSlice.";
import { useDispatch } from "react-redux";

const Store = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const endpoint = categoryId
      ? `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}&offset=${(page - 1) * 10}&limit=10`
      : `https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * 10}&limit=10`;

    axios
      .get(endpoint)
      .then((res) => {
        setProducts(res.data);
        axios
          .get(`https://api.escuelajs.co/api/v1/products`)
          .then((totalRes) => {
            setTotalPages(Math.ceil(totalRes.data.length / 10));
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [categoryId, page]);

  const handleAddToCart = (productId) => {
    dispatch(addCartItem({ id: productId }));
  };

  return (
    <div className="flex">
      <Sidebar className="w-64 bg-gray-200 p-4 fixed h-half" />
      <div className="flex-1 ml-50 p-8">
        <div className="container mx-auto">
          <h1 className=" text-secondary-200 text-center font-bold text-2xl mb-8">
            Products in Category {categoryId}
          </h1>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-96" />
              ))}
            </div>
          )}

          {!isLoading && products.length === 0 && <p>No products found</p>}

          {!isLoading && products.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                {products.map((el) => (
                  <div
                    key={el.id}
                    className="p-4"
                    onClick={() => {
                      navigate(`/category/all/${el.id}`);
                    }}
                  >
                    <AllProduct
                      id={el.id}
                      title={el.title}
                      price={el.price}
                      description={el.description}
                      image={el.images[0]}
                      onAddToCart={() => handleAddToCart(el.id)}
                    />
                  </div>
                ))}
              </div>
              <Pagination totalPages={totalPages} setPage={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
