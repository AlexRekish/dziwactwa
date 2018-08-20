import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavItem.sass';

const NavItem = ({ path, label }) => (
  <li className="main-nav__item">
    <NavLink className="main-nav__link" to={path}>
      {label}
    </NavLink>
  </li>
);

export default NavItem;
