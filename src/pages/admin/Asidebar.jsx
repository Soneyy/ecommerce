import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardLine, RiUserLine, RiShoppingBagLine, RiFileListLine } from 'react-icons/ri'; // Example icons, you can replace with your preferred icons
import { CgProfile } from "react-icons/cg"; 

const Asidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-400 border-l-4 border-blue-500' : '';
  };

  const iconSize = 'text-2xl';
  const iconColor = 'text-gray-800';
  const hoverEffect = 'hover:bg-gray-300 hover:text-white';
  const listItemClasses = 'mb-4 rounded-lg';

  return (
    <div className="w-64 bg-gray-200 text-gray-800 min-h-screen ">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className={`${listItemClasses} ${isActive('/admin/dashboard')}`}>
              <Link to="/admin/dashboard" className={`flex items-center p-3 ${iconColor} ${hoverEffect} ${isActive('/admin/dashboard')}`}>
                <RiDashboardLine className={`${iconSize} mr-2`} />
                Dashboard
              </Link>
            </li>
            <li className={`${listItemClasses} ${isActive('/admin/users')}`}>
              <Link to="/admin/users" className={`flex items-center p-3 ${iconColor} ${hoverEffect} ${isActive('/admin/users')}`}>
                <RiUserLine className={`${iconSize} mr-2`} />
                Customer
              </Link>
            </li>
            <li className={`${listItemClasses} ${isActive('/admin/orders')}`}>
              <Link to="/admin/orders" className={`flex items-center p-3 ${iconColor} ${hoverEffect} ${isActive('/admin/orders')}`}>
                <RiShoppingBagLine className={`${iconSize} mr-2`} />
                Orders
              </Link>
            </li>
            <li className={`${listItemClasses} ${isActive('/admin/products')}`}>
              <Link to="/admin/products" className={`flex items-center p-3 ${iconColor} ${hoverEffect} ${isActive('/admin/products')}`}>
                <RiFileListLine className={`${iconSize} mr-2`} />
                Products
              </Link>
            </li>
            <li className={`${listItemClasses} ${isActive('/admin/profile')}`}>
              <Link to="/admin/profile" className={`flex items-center p-3 ${iconColor} ${hoverEffect} ${isActive('/admin/profile')}`}>
                <CgProfile  className={`${iconSize} mr-2`} />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Asidebar;
