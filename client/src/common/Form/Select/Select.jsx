import React from 'react';
import PropTypes from 'prop-types';
import './Select.sass';

const Select = ({ options, name, label, error, onChange, value }) => (
  <div className="custom-select__wrapper">
    <label htmlFor={name}>{label}</label>
    <select className="custom-select" id={name} onChange={onChange} name={name} value={value}>
      {options.map(option => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <small className="custom-select__error">{error}</small>}
  </div>
);

Select.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.string]),
  value: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  error: false
};

export default Select;
