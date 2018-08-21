import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // eslint-disable-line no-unused-vars
import { fab, faTwitter, faVk, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AnimatedSwitch } from 'react-router-transition';
import Header from './containers/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Social from './common/Social/Social';
import LoginForm from './containers/Auth/LoginForm/LoginForm';
import RegisterForm from './containers/Auth/RegisterForm/RegisterForm';
import { getCurrentUser } from './services/authService';
import Logout from './components/Logout/Logout';

library.add(fab, faTwitter, faInstagram, faVk, faFacebook);

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <Fragment>
        <ToastContainer
          position="top-left"
          style={{ fontFamily: 'Ubuntu', fontWeight: 'bold', fontSize: '20px' }}
        />
        <Social />
        <Header user={user} />
        <section>
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            {user && <Route path="/logout" component={Logout} />}
            {!user && <Route path="/login" component={LoginForm} />}
            {!user && <Route path="/register" component={RegisterForm} />}
            <Route path="/blog" />
            <Route path="/gallery" />
            <Route path="/about" />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </AnimatedSwitch>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
