import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';
import './NavBar.sass';

const links = [
  { path: '/', label: 'Home' },
  { path: '/blog', label: 'Blog' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About Me' }
];

const NavBar = ({ user }) => (
  <nav className="main-navigation">
    <ul className="main-navigation__list">
      {links.map(link => (
        <NavItem path={link.path} label={link.label} key={link.label} />
      ))}
    </ul>
    <ul className="main-navigation__login">
      {user && <NavItem path="/logout" label="Logout" />}
      {!user && <NavItem path="/login" label="Sign In" />}
    </ul>
  </nav>
);

NavBar.propTypes = {
  user: PropTypes.object
};

NavBar.defaultProps = {
  user: null
};

export default NavBar;
