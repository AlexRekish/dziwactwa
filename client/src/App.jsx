import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import { fab, faTwitter, faVk, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPlusSquare, faClone } from '@fortawesome/free-regular-svg-icons';
import { AnimatedSwitch } from 'react-router-transition';

import Header from './containers/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Social from './common/Social/Social';
import Logout from './components/Logout/Logout';
import { Actions } from './store/actions/actions';
import AboutMe from './components/AboutMe/AboutMe';
import asyncComponent from './hoc/asyncComponent';

const LoginForm = asyncComponent(() => import('./containers/Auth/LoginForm/LoginForm'));
const RegisterForm = asyncComponent(() => import('./containers/Auth/RegisterForm/RegisterForm'));

const Blog = asyncComponent(() => import('./containers/Blog/Blog'));
const BlogPost = asyncComponent(() => import('./containers/Blog/BlogPost/BlogPost'));
const BlogPostForm = asyncComponent(() => import('./containers/Blog/BlogForm/BlogPostForm'));
const BlogPostEditForm = asyncComponent(() =>
  import('./containers/Blog/BlogPostEditForm/BlogPostEditForm')
);

const Gallery = asyncComponent(() => import('./containers/Gallery/Gallery'));
const GalleryForm = asyncComponent(() => import('./containers/Gallery/GalleryForm/GalleryForm'));

library.add(
  fab,
  faTwitter,
  faInstagram,
  faVk,
  faFacebook,
  faArrowLeft,
  faPlusSquare,
  faClone,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faTrashAlt
);

class App extends Component {
  state = {};

  componentDidMount() {
    const { logged, onLoginFromLocalStorage } = this.props;
    if (!logged) onLoginFromLocalStorage();
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <ToastContainer
          position="top-left"
          style={{ fontFamily: 'Ubuntu', fontWeight: 'bold', fontSize: '20px' }}
        />
        <Social />
        <Header user={user} />
        <section className="root-content">
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper"
          >
            {user && <Route path="/logout" component={Logout} />}
            {!user && <Route path="/login" component={LoginForm} />}
            {!user && <Route path="/register" component={RegisterForm} />}
            {user && user.isAdmin && <Route path="/blog/new" component={BlogPostForm} />}
            {user && user.isAdmin && <Route path="/blog/edit" component={BlogPostEditForm} />}
            {user && user.isAdmin && <Route path="/gallery/new" exact component={GalleryForm} />}
            <Route path="/blog/:id" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/about" component={AboutMe} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </AnimatedSwitch>
        </section>
        <Footer />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  logged: state.auth.logged
});

const mapDispatchToProps = dispatch => ({
  onLoginFromLocalStorage: () => dispatch(Actions.initUserFromLocalStorage())
});

App.propTypes = {
  logged: PropTypes.bool.isRequired,
  user: PropTypes.object,
  onLoginFromLocalStorage: PropTypes.func.isRequired
};

App.defaultProps = {
  user: null
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
