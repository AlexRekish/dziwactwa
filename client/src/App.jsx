import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // eslint-disable-line no-unused-vars
import { fab, faTwitter, faVk, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import Header from './containers/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Social from './common/Social/Social';

library.add(fab, faTwitter, faInstagram, faVk, faFacebook);

class App extends Component {
  state = {};

  render() {
    return (
      <Fragment>
        <ToastContainer
          position="top-left"
          style={{ fontFamily: 'Ubuntu', fontWeight: 'bold', fontSize: '20px' }}
        />
        <Social />
        <Header />
        <main>
          <Switch>
            <Route path="/blog" />
            <Route path="/gallery" />
            <Route path="/about" />
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
