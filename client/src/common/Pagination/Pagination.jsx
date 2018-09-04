import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Pagination.sass';

const Pagination = ({ itemCount, pageSize, onPageChanged, currentPage }) => {
  const itemCounts = Math.ceil(itemCount / pageSize);
  if (itemCounts === 1) return null;
  const pages = new Array(itemCounts).fill().map((page, index) => index + 1);
  return (
    <ul className="pagination">
      {itemCounts > 7 ? (
        <Fragment>
          <li className="pagination__item">
            <button
              type="button"
              className="pagination__link"
              onClick={() => onPageChanged(currentPage - 1)}
              disabled={currentPage === pages[0]}
            >
              Prev
            </button>
          </li>
          <li className="pagination__item">
            <button
              type="button"
              className={
                pages[0] === currentPage
                  ? 'pagination__link pagination__link--active'
                  : 'pagination__link'
              }
              onClick={() => onPageChanged(pages[0])}
            >
              {pages[0]}
            </button>
          </li>
          <li className="pagination__item">
            <p className="pagination__breadcrumbs">...</p>
          </li>
          <li className="pagination__item">
            <button
              type="button"
              className={
                pages[pages.length - 1] === currentPage
                  ? 'pagination__link pagination__link--active'
                  : 'pagination__link'
              }
              onClick={() => onPageChanged(pages[pages.length - 1])}
            >
              {pages[pages.length - 1]}
            </button>
          </li>
          <li className="pagination__item">
            <button
              type="button"
              className="pagination__link"
              onClick={() => onPageChanged(currentPage + 1)}
              disabled={currentPage === pages.length}
            >
              Next
            </button>
          </li>
        </Fragment>
      ) : (
        pages.map(page => (
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
        ))
      )}
    </ul>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,

  onPageChanged: PropTypes.func.isRequired
};

export default Pagination;
