import React from 'react';
import PropTypes from 'prop-types';
import './Input.sass';

const Input = ({ name, label, onChange, value, placeholder, type, error, readonly }) => (
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
      readOnly={readonly}
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

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.string]),
  readonly: PropTypes.bool,

  onChange: PropTypes.func.isRequired
};

Input.defaultProps = {
  error: false,
  readonly: false
};

export default Input;
