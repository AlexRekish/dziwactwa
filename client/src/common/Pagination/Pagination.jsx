import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';

import SimplePagination from './SimplePagination/SimplePagination';
import ComplexPagination from './ComplexPagination/ComplexPagination';
import './Pagination.sass';

const Pagination = ({ itemCount, pageSize, onPageChanged, currentPage }) => {
  const itemCounts = Math.ceil(itemCount / pageSize);
  if (itemCounts === 1) return null;
  const pages = new Array(itemCounts).fill().map((page, index) => index + 1);
  return (
    <ul className="pagination">
      {itemCounts > 7 ? (
        <ComplexPagination pages={pages} currentPage={currentPage} onPageChanged={onPageChanged} />
      ) : (
        <SimplePagination pages={pages} currentPage={currentPage} onPageChanged={onPageChanged} />
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
