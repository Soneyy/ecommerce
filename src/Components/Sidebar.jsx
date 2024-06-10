import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const categories = ["All", "Clothes", "Electronic", "Furniture", "Shoes", "Miscellaneous"];

  return (
    <div className="sidebar bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="mb-2">
            <Link to={`/store/category/${category.toLowerCase()}`} className="text-blue-500 hover:underline">
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
