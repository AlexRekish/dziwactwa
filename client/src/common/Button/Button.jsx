import React from 'react';
import PropTypes from 'prop-types';
import './Button.sass';

const Button = ({ type, label, clicked, disabled, danger, confirm }) => {
  let className;
  if (danger) className = 'custom-button--danger';
  if (confirm) className = 'custom-button--confirm';
  if (!danger && !confirm) className = '';
  return (
    <button
      type={type}
      className={`custom-button ${className}`}
      onClick={clicked}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  danger: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),

  clicked: PropTypes.func.isRequired
};

Button.defaultProps = {
  disabled: false,
  danger: false
};

export default Button;
