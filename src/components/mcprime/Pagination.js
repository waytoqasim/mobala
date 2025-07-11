import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange, currentPosts, filteredList }) => (
  <div className="d-flex flex-column align-items-center">
    <div className="mt-5">
      Showing {currentPosts.length} orders out of {filteredList.length}
    </div>
    <div className="d-flex align-items-center justify-content-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`btn btn-light px-3 py-2 me-3 rounded ${currentPage === 1 ? 'opacity-50' : ''}`}
      >
        <KeyboardArrowLeftIcon />
      </button>
      <span className="me-4 fw-bold" style={{ marginBottom: "0px", whiteSpace: "nowrap" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`btn btn-light px-3 py-2 me-3 rounded ${currentPage === totalPages ? 'opacity-50' : ''}`}
      >
        <KeyboardArrowRightIcon />
      </button>
    </div>
  </div>
);

export default Pagination;
