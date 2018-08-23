import React, { Component, Fragment } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { fab, faTwitter, faVk, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { AnimatedSwitch } from 'react-router-transition';
import Header from './containers/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Social from './common/Social/Social';
import LoginForm from './containers/Auth/LoginForm/LoginForm';
import RegisterForm from './containers/Auth/RegisterForm/RegisterForm';
import Logout from './components/Logout/Logout';
import { Actions } from './store/actions/actions';
import AboutMe from './components/AboutMe/AboutMe';
import Blog from './containers/Blog/Blog';
import BlogPost from './containers/Blog/BlogPost/BlogPost';
import BlogPostForm from './containers/Blog/BlogForm/BlogPostForm';
import BlogPostEditForm from './containers/Blog/BlogPostEditForm/BlogPostEditForm';

library.add(fab, faTwitter, faInstagram, faVk, faFacebook, faTimes);

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
            {user && user.isAdmin && <Route path="/blog/new" component={BlogPostForm} />}
            {user && user.isAdmin && <Route path="/blog/edit" component={BlogPostEditForm} />}
            <Route path="/blog/:id" component={BlogPost} />
            <Route path="/blog" component={Blog} />
            <Route path="/gallery" />
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
  user: state.user,
  logged: state.logged
});

const mapDispatchToProps = dispatch => ({
  onLoginFromLocalStorage: () => dispatch(Actions.getUserFromLocalStorage())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
