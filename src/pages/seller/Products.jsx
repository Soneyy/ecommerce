import axios from "axios";
import React, { useEffect, useState } from "react";

export default function SellerProducts() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem("token");

    axios
      .get("https://api.escuelajs.co/api/v1/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  }, []);
  return (
    <>
      <div>Seller products</div>
      {JSON.stringify(products)}
    </>
  );
}