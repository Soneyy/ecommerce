import React, { useContext, createContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLast, ChevronFirst } from "lucide-react";
import axios from "axios";

const SidebarContext = createContext();

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [categories, setCategories] = useState([{ name: "All", id: "" }]);

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((response) => {
        const fetchedCategories = response.data.map(
          (category) => ({
            name: category.name,
            id: category.id
          })
        );
        setCategories((prevCategories) =>
          [...prevCategories, ...fetchedCategories].slice(0, 10)
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-gray-200 p-6 border-r shadow-sm">
        <div className="pb-4 flex justify-between items-center">
          <h2
            className={`text-2xl font-bold text-gray-700 transition-all ${
              expanded ? "block" : "hidden"
            }`}
          >
            Categories
          </h2>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-300 hover:bg-gray-400 ml-6"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 space-y-4">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <SidebarItem key={category.id} text={category.name} id={category.id} />
              ))
            ) : (
              <li>No categories found</li>
            )}
          </ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ text, id }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
      <Link
        to={`/store?categoryId=${id}`}
        className={`text-lg text-purple-400 hover:bg-primary w-full transition-all ${
          expanded ? "block" : "hidden"
        }`}
      >
        {text}
      </Link>

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebar;
