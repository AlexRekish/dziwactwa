import React from 'react';
import './TextArea.sass';

const Select = ({ name, label, error, onChange, value, placeholder }) => (
  <div className="custom-text-area__wrapper">
    <label htmlFor={name} className="custom-text-area__label">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows="8"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="custom-text-area"
    />
    {error ? (
      <small className="custom-text-area__error">{error}</small>
    ) : (
      <small className="custom-text-area__error" style={{ visibility: 'hidden' }}>
        No error
      </small>
    )}
  </div>
);

export default Select;
