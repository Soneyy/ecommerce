import React, { useState } from 'react';
import { CiMail, CiHeart } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearch, IoPersonOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/userSlice';

export default function Header() {
  const user = useSelector((store) => store.user.value);
  const cartItems = useSelector((store) => store.cart.value);
  const wishlistItems = useSelector((store) => store.wishlist.wishlistItems) || []; // Ensure wishlistItems is initialized as an empty array
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token or any relevant stored data
    localStorage.removeItem('user'); // Clear stored user data
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header>
      <div className="bg-primary">
        <nav className="py-[14px] text-center font-josefin text-white container flex justify-between items-center">
          <div className="flex items-center">
            <CiMail className="mr-2" />
            <span className="mr-10">sherpasoni59@gmail.com</span>
            <FiPhoneCall className="mr-2" />
            <span>(12345)67890</span>
          </div>

          <div className="flex items-center ml-auto space-x-5">
            {user && (
              <div className="relative flex items-center mr-5">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.name || 'User Avatar'}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <span className="mr-2 cursor-pointer flex items-center" onClick={toggleDropdown}>
                  {user.name || 'User'}
                </span>
                {isDropdownOpen ? <IoChevronUp onClick={toggleDropdown} className="cursor-pointer" /> : <IoChevronDown onClick={toggleDropdown} className="cursor-pointer" />}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-10 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      onClick={handleLogout}
                      className="block px-4 py-2 text-red-500 hover:bg-gray-200 cursor-pointer"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}
             <Link to="/wishlist" className="flex items-center">
              Wishlist <CiHeart className="ml-1" /> ({wishlistItems.length})
            </Link>
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="mr-1" />
              {user && `(${cartItems.length})`}
            </Link>
            {!user && (
              <Link to="/login" className="flex items-center">
                Login <IoPersonOutline className="ml-1" />
              </Link>
            )}
          </div>
        </nav>
      </div>
      <div className="bg-white">
        <nav className="container justify-between pb-[12px] pt-[18px] flex items-center">
          <Link
            id="logo"
            to="/"
            className="leading-auto inline-block font-josefin text-[34px] font-semibold text-secondary-200 hover:text-primary"
          >
            Storew
          </Link>
          <Link
            to="/"
            className="text-secondary-200 hover:text-primary flex items-center ml-20 font-bold text-[20px]"
          >
            Home
          </Link>
          <Link
            to="/store"
            className="text-primary hover:text-secondary-200 ml-8 font-bold text-[20px]"
          >
            Store
          </Link>
          <form className="flex items-center ml-auto border-black">
            <input
              type="text"
              className="focus:border-secondary flex focus:transition-all focus:outline-none border border-primary-light"
            />
            <button className="bg-secondary px-2 h-6">
              <IoSearch className="text-white" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
