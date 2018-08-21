import React from 'react';
import './Button.sass';

const Button = ({ type, label, clicked, disabled }) => (
  <button type={type} className="custom-button" onClick={clicked} disabled={disabled}>
    {label}
  </button>
);

export default Button;
