import React from 'react';
import PropTypes from 'prop-types';
import './SearchBox.sass';

const SearchBox = ({ value, onChange }) => (
  <div className="custom-search-box">
    <input
      type="search"
      name="search"
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

export default SearchBox;
