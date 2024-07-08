import React from "react";

const Pagination = ({ totalPages, currentPage, setPage }) => {
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border-gray-300 rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
