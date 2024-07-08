import React, { useState } from 'react';
import { CiMail, CiHeart } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { IoSearch, IoPersonOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutUser } from '../redux/slice/userSlice';

const Header = () => {
  const user = useSelector((store) => store.user.value);
  const cartItems = useSelector((store) => store.cart.value);
  const wishlistItems = useSelector((store) => store.wishlist.wishlistItems) || [];
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    dispatch(logoutUser());
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    console.log('Search term:', searchTerm);
  };

  const linkClass = (path) => (
    location.pathname === path ? 'text-primary font-bold' : 'text-secondary-200 hover:text-primary'
  );

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
            {user && !user.isAdmin && ( 
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
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
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
              Wishlist <CiHeart className="ml-1" /> {wishlistItems.length > 0 && wishlistItems.length}
            </Link>
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="mr-1" />
              {user && !user.isAdmin && `(${cartItems.length})`} 
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
          <NavLink
            to="/"
            className={`flex items-center ml-20 text-[20px] ${linkClass('/')}`}
            activeClassName="text-primary font-bold" 
          >
            Home
          </NavLink>
          <NavLink
            to="/store"
            className={`ml-8 text-[20px] ${linkClass('/store')}`}
            activeClassName="text-primary font-bold" 
          >
            Store
          </NavLink>
          <NavLink
            to="/about"
            className={`ml-8 text-[20px] ${linkClass('/about')}`}
            activeClassName="text-primary font-bold" 
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={`ml-8 text-[20px] ${linkClass('/contact')}`}
            activeClassName="text-primary font-bold" 
          >
            Contact
          </NavLink>
          <form onSubmit={handleSearchSubmit} className="flex items-center ml-auto border-black">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="focus:border-secondary flex focus:transition-all focus:outline-none border border-primary-light px-2 py-1"
              placeholder="Search..."
            />
            <button type="submit" className="bg-secondary px-2 h-10 flex items-center justify-center">
              <IoSearch  />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
};

export default Header;
