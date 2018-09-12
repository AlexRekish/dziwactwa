import React from 'react';
import PropTypes from 'prop-types';

import PaginationNormalItem from '../PaginationNormalItem/PaginationNormalItem';

const SimplePagination = ({ pages, currentPage, onPageChanged }) =>
  pages.map(page => (
    <PaginationNormalItem
      key={page}
      page={page}
      label={page}
      currentPage={currentPage}
      onPageChanged={onPageChanged}
    />
  ));

SimplePagination.propTypes = {
  pages: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,

  onPageChanged: PropTypes.func.isRequired
};

export default SimplePagination;
