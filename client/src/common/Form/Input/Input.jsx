import React from 'react';
import './Input.sass';

const Input = ({ name, label, onChange, value, placeholder, type, error }) => (
  <div className="custom-input__wrapper">
    <label htmlFor={name} className="custom-input__label">
      {label}
    </label>
    <input
      type={type}
      className="custom-input"
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      style={
        error
          ? { borderColor: 'rgb(213, 0, 0)', backgroundColor: 'rgba(250, 128, 114, 0.5)' }
          : null
      }
    />
    {error ? (
      <small className="custom-input__error">{error}</small>
    ) : (
      <small className="custom-input__error" style={{ visibility: 'hidden' }}>
        No error :)
      </small>
    )}
  </div>
);

export default Input;
