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
      <div className="bg-[#544c5d]">
        <nav className="py-[14px] text-center font-josefin text-white container flex justify-between items-center">
          <div className="flex items-center">
            <CiMail className="mr-2" />
            <span className="mr-10">sherpasoni59@gmail.com</span>
            <FiPhoneCall className="mr-2" />
            <span>(12345)67890</span>
          </div>

          <div className="flex items-center">
            <span className="flex items-center mr-5">
              {user ? (
                <>
                  {JSON.stringify(user?.name)}
                  <span
                    onClick={() => {
                      dispatch(logout());
                    }}
                    className="ml-3 cursor-pointer"
                  >
                    logout
                  </span>
                </>
              ) : (
                <Link to={'/Login'} className="flex items-center">
                  Login <IoPersonOutline />
                </Link>
              )}
            </span>
            <span>
              <Link to={'/cart'} className="flex items-center">
                <FaShoppingCart className="mr-1" /> ({cartItems.length})
              </Link>
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
           Storew
          </Link>
          <Link to="/" className="text-secondary flex items-center ml-20">
            Home <IoIosArrowDown className="ml-1" />
          </Link>
          <a href="/store" className="hover:text-secondary ml-5">
            Store
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
