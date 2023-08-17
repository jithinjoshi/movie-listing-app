/* eslint-disable react/prop-types */


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex items-center justify-center pt-6">
      <button
        className={`mx-1 px-3 py-1 cursor-pointer text-sm font-semibold text-gray-900 ${
          currentPage === 1 ? "cursor-not-allowed" : "hover:scale-105"
        } focus:outline-none`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &larr; Previous
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 px-3 py-1 rounded-md border ${
            currentPage === pageNumber ? "bg-gray-400" : "border-gray-400"
          } text-gray-900 hover:scale-105 focus:outline-none`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className={`mx-1 px-3 py-1 text-sm font-semibold text-gray-900 ${
          currentPage === totalPages ? "cursor-not-allowed" : "hover:scale-105"
        } focus:outline-none`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default Pagination;
