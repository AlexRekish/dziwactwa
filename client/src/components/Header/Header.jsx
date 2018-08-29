import React from 'react';
import PropTypes from 'prop-types';
import './Header.sass';
import NavBar from '../NavBar/NavBar';

const Header = ({ user }) => (
  <header className="main-header">
    <NavBar user={user} />
  </header>
);

Header.propTypes = {
  user: PropTypes.object
};

Header.defaultProps = {
  user: null
};

export default Header;
