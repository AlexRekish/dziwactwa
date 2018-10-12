import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import './SearchBox.sass';

const SearchBox = ({ value, onChange }) => (
  <div className="custom-search-box">
    <label htmlFor="search" className="visually-hidden">
      Search...
    </label>
    <input
      type="text"
      name="search"
      id="search"
      value={value}
      placeholder="Search..."
      onChange={evt => onChange(evt.target.value)}
      className="custom-search-box__input"
    />
  </div>
);

SearchBox.propTypes = {
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired
};

export default onlyUpdateForKeys(['value'])(SearchBox);
