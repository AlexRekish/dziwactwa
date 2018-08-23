import React from 'react';
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

export default Button;
