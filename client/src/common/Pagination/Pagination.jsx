import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';

import PaginationNormalItem from './PaginationNormalItem/PaginationNormalItem';
import PaginationControlItem from './PaginationControlItem/PaginationControlItem';
import './Pagination.sass';

const Pagination = ({ itemCount, pageSize, onPageChanged, currentPage }) => {
  const itemCounts = Math.ceil(itemCount / pageSize);
  if (itemCounts === 1) return null;
  const pages = new Array(itemCounts).fill().map((page, index) => index + 1);
  return (
    <ul className="pagination">
      {itemCounts > 7 ? (
        <Fragment>
          <PaginationControlItem
            page={pages[0]}
            label="Prev"
            currentPage={currentPage}
            onPageChanged={() => onPageChanged(currentPage - 1)}
          />
          <PaginationNormalItem
            page={pages[0]}
            label={pages[0]}
            currentPage={currentPage}
            onPageChanged={() => onPageChanged(pages[0])}
          />
          <li className="pagination__item">
            <p className="pagination__breadcrumbs">...</p>
          </li>
          <PaginationNormalItem
            page={pages[pages.length - 1]}
            label={pages[pages.length - 1]}
            currentPage={currentPage}
            onPageChanged={() => onPageChanged(pages[pages.length - 1])}
          />
          <PaginationControlItem
            page={pages.length}
            label="Next"
            currentPage={currentPage}
            onPageChanged={() => onPageChanged(currentPage + 1)}
          />
        </Fragment>
      ) : (
        pages.map(page => (
          <PaginationNormalItem
            key={page}
            page={page}
            label={page}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
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

export default onlyUpdateForKeys(['itemCount', 'currentPage'])(Pagination);
