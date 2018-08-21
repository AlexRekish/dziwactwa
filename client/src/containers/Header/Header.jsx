import React from 'react';
import './Header.sass';
import NavBar from '../../components/NavBar/NavBar';

const Header = ({ user }) => (
  <header className="main-header">
    <NavBar user={user} />
  </header>
);

export default Header;
