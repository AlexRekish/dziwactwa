import React from 'react';
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

export default Select;
