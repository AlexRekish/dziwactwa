import React from 'react';
import PropTypes from 'prop-types';
import './Button.sass';

const Button = ({ type, label, clicked, disabled, danger }) => (
  <button
    type={type}
    className={danger ? 'custom-button custom-button--danger' : 'custom-button'}
    onClick={clicked}
    disabled={disabled}
  >
    {label}
  </button>
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  danger: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};

Button.defaultProps = {
  disabled: false,
  danger: false
};

export default Button;
