import React from 'react';
import PropTypes from 'prop-types';
import './TextArea.sass';

const TextArea = ({ name, label, error, onChange, value, placeholder, rows }) => (
  <div className="custom-text-area__wrapper">
    <label htmlFor={name} className="custom-text-area__label">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      rows={rows}
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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object, PropTypes.array, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired
};

TextArea.defaultProps = {
  error: false
};

export default TextArea;
