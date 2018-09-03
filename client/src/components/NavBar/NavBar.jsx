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

const NavBar = ({ user, open, clicked }) => (
  <nav className={!open ? 'main-navigation' : 'main-navigation main-navigation--open'}>
    <ul className="main-navigation__list">
      {links.map(link => (
        <NavItem path={link.path} label={link.label} key={link.label} clicked={clicked} />
      ))}
    </ul>
    <ul className="main-navigation__login">
      {user && <NavItem path="/logout" label="Logout" clicked={clicked} />}
      {!user && <NavItem path="/login" label="Sign In" clicked={clicked} />}
    </ul>
  </nav>
);

NavBar.propTypes = {
  user: PropTypes.object,
  open: PropTypes.bool.isRequired,

  clicked: PropTypes.func.isRequired
};

NavBar.defaultProps = {
  user: null
};

export default NavBar;
