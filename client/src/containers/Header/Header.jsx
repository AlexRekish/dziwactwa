import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Header.sass';
import NavBar from '../../components/NavBar/NavBar';
import Burger from '../../common/Burger/Burger';

class Header extends Component {
  state = {
    menuIsOpen: false
  };

  clickBurgerHandler = () => {
    this.setState(prevState => ({ menuIsOpen: !prevState.menuIsOpen }));
  };

  render() {
    const { user } = this.props;
    const { menuIsOpen } = this.state;
    return (
      <header className="main-header">
        <Burger clicked={this.clickBurgerHandler} open={menuIsOpen} />
        <NavBar user={user} open={menuIsOpen} clicked={this.clickBurgerHandler} />
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object
};

Header.defaultProps = {
  user: null
};

export default Header;
