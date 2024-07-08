

import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; 
const AdminHeader = () => {
  
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Admin Dashboard
        </Link>
        
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/login" className="hover:text-gray-300 flex items-center">
                <FiLogOut className="mr-1" /> Logout
              </Link>
            </li>
          </ul>
        </nav>
      
      </div>
    </header>
  );
};

export default AdminHeader;
