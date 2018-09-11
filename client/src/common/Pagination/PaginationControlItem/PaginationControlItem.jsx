import React from 'react';
import PropTypes from 'prop-types';

const PaginationControlItem = ({ page, currentPage, onPageChanged, label }) => (
  <li className="pagination__item">
    <button
      type="button"
      className="pagination__link"
      onClick={onPageChanged}
      disabled={currentPage === page}
    >
      {label}
    </button>
  </li>
);

PaginationControlItem.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  onPageChanged: PropTypes.func.isRequired
};

export default PaginationControlItem;
