import React from 'react';
import PropTypes from 'prop-types';
import './TextArea.sass';

const TextArea = ({ name, label, error, onChange, value, placeholder }) => (
  <div className="custom-text-area__wrapper">
    <label htmlFor={name} className="custom-text-area__label">
      {label}
    </label>
    <textarea
      name={name}
      id={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className="custom-text-area"
      style={
        error
          ? { borderColor: 'rgb(213, 0, 0)', backgroundColor: 'rgba(250, 128, 114, 0.5)' }
          : null
      }
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
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

  onChange: PropTypes.func.isRequired
};

TextArea.defaultProps = {
  error: false
};

export default TextArea;
