import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import PaginationNormalItem from '../PaginationNormalItem/PaginationNormalItem';
import PaginationControlItem from '../PaginationControlItem/PaginationControlItem';

const ComplexPagination = ({ pages, currentPage, onPageChanged }) => (
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
    {currentPage > pages[0] && currentPage < pages[pages.length - 1] ? (
      <li className="pagination__item">
        <p className="pagination__current">{currentPage}</p>
      </li>
    ) : (
      <li className="pagination__item">
        <p className="pagination__current">...</p>
      </li>
    )}
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
);

ComplexPagination.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,

  onPageChanged: PropTypes.func.isRequired
};

export default ComplexPagination;
