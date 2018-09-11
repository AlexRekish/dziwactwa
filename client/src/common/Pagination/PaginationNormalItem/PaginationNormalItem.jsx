import React from 'react';
import PropTypes from 'prop-types';

const PaginationNormalItem = ({ page, currentPage, onPageChanged, label }) => (
  <li className="pagination__item">
    <button
      type="button"
      className={
        page === currentPage ? 'pagination__link pagination__link--active' : 'pagination__link'
      }
      onClick={() => onPageChanged(page)}
    >
      {label}
    </button>
  </li>
);

PaginationNormalItem.propTypes = {
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,

  onPageChanged: PropTypes.func.isRequired
};

export default PaginationNormalItem;
