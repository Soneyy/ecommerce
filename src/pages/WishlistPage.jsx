import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetWishlist, removeFromWishlist } from "../redux/slice/wishlistsSlice";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import emptyCart from "../assets/emptyCart.png";
import { FiShoppingCart } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCartItem } from "../redux/slice/cartSlice."; 

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleClearWishlist = () => {
    dispatch(resetWishlist());
    toast.success("Wishlist cleared!");
  };

  const handleaddCartItem = (item) => {
    dispatch(addCartItem(item));
    toast.success("Item added to cart!");
  };

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <>
          <table className="min-w-full font-semibold mb-6">
            <thead>
              <tr>
                <th className="py-2 bg-gray-200">Product</th>
                <th className="py-2 bg-gray-200">Title</th>
                <th className="py-2 bg-gray-200">Price</th>
                <th className="py-2 bg-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 flex justify-center">
                    <img
                      src={item.image}
                      className="w-24 h-24 object-cover"
                      alt={item.title}
                    />
                  </td>
                  <td className="py-2 text-center">{item.title}</td>
                  <td className="py-2 text-center">${item.price}</td>
                  <td className=" flex justify-center items-center space-x-1">
                    <button
                      onClick={() => handleaddCartItem(item)}
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700 flex items-center"
                    >
                      <FiShoppingCart className="mr-1" />
                   
                    </button>
                    <button
                      className="action-icon p-1 text-red-500 hover:text-red-700 text-2xl"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleClearWishlist}
            className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Clear Wishlist
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src={emptyCart}
            alt="Empty Cart"
            className="w-40 h-auto rounded-lg p-4"
          />
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Your Wishlist is empty.
            </h1>
            <Link to="/store">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
