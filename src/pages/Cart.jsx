import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../redux/slice/cartSlice."; // Ensure correct path for cart actions
import BreadCrumb from "../Components/common/BreadCrumb";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Useauth } from "../Components/hook/Useauth"; // Ensure correct path for Useauth
import { motion } from "framer-motion"; // Import motion for animations
import emptyCart from "../assets/emptyCart.png";


const Cart = () => {
  const cartItems = useSelector((reduxStore) => reduxStore.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation
  const { isLoggedIn } = Useauth(); // Custom hook to check authentication

  // Calculate total amount
  const totalAmt = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCharge = 10; // Sample shipping charge

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartItemQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleClearCart = () => {
    dispatch(resetCart());
  };

  const handleDeleteItem = (id) => {
    dispatch(removeCartItem(id));
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto text-center">
        <BreadCrumb title="Shopping Cart" />
        <p className="mt-4">Please log in to view your cart items.</p>
      </div>
    );
  }

  return (
    <>
      <BreadCrumb title="Shopping Cart" />
      <div className="container mx-auto">
        {cartItems.length > 0 ? (
          <>
            <table className="min-w-full font-semibold mb-6">
              <thead>
                <tr>
                  <th className="py-2 bg-gray-200">Product</th>
                  <th className="py-2 bg-gray-200">Title</th>
                  <th className="py-2 bg-gray-200">Price</th>
                  <th className="py-2 bg-gray-200">Quantity</th>
                  <th className="py-2 bg-gray-200">Total</th>
                  <th className="py-2 bg-gray-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
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
                    <td className="py-2 text-center">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-12 text-center border"
                      />
                    </td>
                    <td className="py-2 text-center">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-2 text-center">
                      <button
                        className="action-icon p-1 text-red-500 hover:text-red-700 text-2xl"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleClearCart}
              className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-6 hover:bg-red-700 duration-300"
            >
              Clear cart
            </button>
            <div className="max-w-7xl gap-4 flex justify-end mt-8">
              <div className="w-96 flex flex-col gap-4">
                <h1 className="text-2xl font-semibold text-right">
                  Cart totals
                </h1>
                <div>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Subtotal
                    <span className="font-semibold tracking-wide">
                      ${totalAmt}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                    Shipping Charge
                    <span className="font-semibold tracking-wide">
                      ${shippingCharge}
                    </span>
                  </p>
                  <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                    Total
                    <span className="font-bold tracking-wide text-lg">
                      ${totalAmt + shippingCharge}
                    </span>
                  </p>
                </div>
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-secondary-300 hover:bg-secondary-200 text-white mt-1">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <img
              src={emptyCart} // Make sure you have imported or defined `emptyCart` image
              alt="Empty Cart"
              className="w-80 rounded-lg p-4"
            />
            <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
              <h1 className="font-titleFont text-xl font-bold uppercase">
                Your Cart feels lonely.
              </h1>
              <p className="text-sm text-center px-10 -mt-2">
                Your Shopping cart lives to serve. Give it purpose - fill it
                with books, electronics, videos, etc. and make it happy.
              </p>
              <Link to="/store">
                <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;