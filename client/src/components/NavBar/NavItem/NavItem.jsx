import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NavItem.sass';

const NavItem = ({ path, label }) => (
  <li className="main-nav__item">
    <NavLink className="main-nav__link" to={path} exact activeClassName="main-nav__link--active">
      {label}
    </NavLink>
  </li>
);

NavItem.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default NavItem;
