import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';
import './Burger.sass';

const Burger = ({ clicked, open }) => (
  <button type="button" className={!open ? 'burger' : 'burger burger--open'} onClick={clicked}>
    <span className="burger__line" />
    <span className="burger__line" />
    <span className="burger__line" />
    <span className="visually-hidden">Menu</span>
  </button>
);

Burger.propTypes = {
  open: PropTypes.bool.isRequired,

  clicked: PropTypes.func.isRequired
};

export default onlyUpdateForKeys(['open'])(Burger);
