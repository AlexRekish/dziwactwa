import React from 'react';
import './Pagination.sass';

const Pagination = ({ itemCount, pageSize, onPageChanged, currentPage }) => {
  const itemCounts = Math.ceil(itemCount / pageSize);
  if (itemCounts === 1) return null;
  const pages = new Array(itemCounts).fill().map((page, index) => index + 1);
  return (
    <ul className="pagination">
      {pages.map(page => (
        <li className="pagination__item" key={page}>
          <button
            type="button"
            className={
              page === currentPage
                ? 'pagination__link pagination__link--active'
                : 'pagination__link'
            }
            onClick={() => onPageChanged(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;