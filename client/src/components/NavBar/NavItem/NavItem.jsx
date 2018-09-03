import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavItem.sass';

const NavItem = ({ path, label, clicked }) => (
  <li className="main-nav__item">
    <NavLink
      className="main-nav__link"
      to={path}
      exact
      activeClassName="main-nav__link--active"
      onClick={clicked}
    >
      {label}
    </NavLink>
  </li>
);

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,

  clicked: PropTypes.func.isRequired
};

export default NavItem;
