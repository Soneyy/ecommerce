import React from 'react';
import { CiMail } from 'react-icons/ci';
import { FiPhoneCall } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPersonOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slice/userSlice';

export default function Header() {
  let user = useSelector((store) => store.user.value);
  let cartItems = useSelector((store) => store.cart.value);

  let dispatch = useDispatch();

  return (
    <header>
      <div className="bg-[#7E33E0]">
        <nav className="py-[14px] text-center font-josefin text-white container flex justify-between items-center">
          <div>
            <CiMail className="inline-block mr-2" />
            sherpasoni59@gmail.com
            <FiPhoneCall className="inline-block ml-10" />
            (12345)67890
          </div>

          <div className="flex items-center">
            <span className="flex items-center">
              <span>English</span>
              <IoIosArrowDown />
            </span>
            <span className="flex items-center font-bold ml-5">
              <span>USD</span>
              <IoIosArrowDown />
            </span>

            <span className="flex items-center">
              {user ? (
                <>
                  {JSON.stringify(user?.name)}
                  <span
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    logout
                  </span>
                </>
              ) : (
                <Link to={'/Login'}className="flex items-center ml-5">
                  Login <IoPersonOutline />
                </Link>
              )}
            </span>
            <span className="flex items-center ml-5">
              Wishlist <CiHeart />
            </span>
            <span className="ml-7">
              <Link to={'/cart'} className="flex items-center">
                {' '}
                <FaShoppingCart /> ({cartItems.length})
              </Link>{' '}
            </span>
          </div>
        </nav>
      </div>
      <div className="bg-white">
        <nav className="container justify-between pb-[12px] pt-[18px] flex items-center">
          <Link
            id="logo"
            to="/"
            className="leading-auto inline-block border font-josefin text-[34px] font-semibold text-primary-dark hover:text-secondary"
          >
            Hekto
          </Link>
          <Link to="/" className="text-secondary flex items-center ml-20">
            Home <IoIosArrowDown />
          </Link>
          <a href="" className="hover:text-secondary ml-5">
            Pages
          </a>
          <Link to="/products" className="hover:text-secondary ml-6">
            Products
          </Link>
          <a href="" className="hover:text-secondary ml-7">
            Blog
          </a>
          <a href="" className="hover:text-secondary ml-8">
            Shop
          </a>
          <a href="" className="hover:text-secondary ml-9">
            Contact
          </a>
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
