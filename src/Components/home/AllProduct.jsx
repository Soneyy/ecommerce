import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../redux/slice/cartSlice."; // Corrected import
import { addToWishlist } from "../../redux/slice/wishlistsSlice"; // Import addToWishlist action
import { Useauth } from "../hook/Useauth"; // Import useAuth hook
import { toast } from "react-toastify"; // Optionally import toast for notifications
import { BsSuitHeartFill } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineZoomIn } from "react-icons/ai";
import { GiReturnArrow } from "react-icons/gi";
import { MdOutlineLabelImportant } from "react-icons/md";

export default function AllProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = Useauth(); // Use Useauth hook

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      dispatch(addCartItem(props)); // Corrected action
      toast.success("Item added to cart"); // Optional: show success message
    } else {
      toast.error("You need to be logged in to add items to the cart"); // Optional: show error message
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  const handleProductDetails = () => {
    navigate(`/products/${props._id}`);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation(); // Stop event propagation
    dispatch(addToWishlist(props)); // Dispatch addToWishlist action
    toast.success('Item added to wishlist'); // Optional: show success message
  };

  const handleRemoveFromWishlist = (e) => {
    e.stopPropagation(); // Stop event propagation
    dispatch(removeFromWishlist(props._id)); // Dispatch removeFromWishlist action
    toast.success('Item removed from wishlist'); // Optional: show success message
    props.handleRemoveFromWishlist();
  };


  return (
    <div
      onClick={() => {
        navigate(`/category/all/${props.categoryId}`);
      }}
      className="group relative bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer"
      style={{ height: "300px", width: "250px" }}
    >
      <img
        src={props.image}
        className="h-3/5 w-full object-cover"
        alt={props.title}
      />
      <div className="bg-white p-3 text-center">
        <p className="mb-1">
          <Link to={`/products/${props._id}`} className="text-gray-800">
            {props.title}
          </Link>
        </p>
        <p className="text-gray-600">${props.price}</p>
      </div>
      <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
        <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
          <li
            onClick={handleAddToCart}
            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
          >
            Add to Cart
            <span>
              <FaCartPlus />
            </span>
          </li>
          <li
            onClick={handleProductDetails}
            className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
          >
            View Details
            <span className="text-lg">
              <MdOutlineLabelImportant />
            </span>
          </li>
          {props.showRemoveFromWishlist ? (
            <li
              onClick={handleRemoveFromWishlist}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Remove from Wishlist
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          ) : (
            <li
              onClick={handleAddToWishlist}
              className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Wishlist
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}