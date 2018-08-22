import React from 'react';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import register from '../../../services/usersService';
import { loginWithJwt } from '../../../services/authService';
import '../Auth.sass';
import { Actions } from '../../../store/actions/actions';

class RegisterForm extends Form {
  state = {
    data: {
      name: '',
      email: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .label('Name'),
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email()
      .label('Email'),
    password: Joi.string()
      .min(10)
      .max(24)
      .required()
      .label('Password')
  };

  onSubmitted = async () => {
    try {
      const { data: user } = this.state;
      const { onLogin, history } = this.props;
      const res = await register(user);
      loginWithJwt(res);
      onLogin(res.data);
      history.push('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const { errors } = { ...this.state };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  loginClickHandler = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <section className="auth">
        <form className="auth__form" onSubmit={this.formSubmitHandler}>
          <h1 className="auth__header">Register</h1>
          {this.renderInput('name', 'Name', 'Enter your name')}
          {this.renderInput('email', 'Email', 'Enter your email', 'email')}
          {this.renderInput('password', 'Password', 'Enter your password', 'password')}
          <div className="auth__buttons-wrapper">
            <Button
              type="button"
              label="Register"
              clicked={this.formSubmitHandler}
              disabled={this.validate()}
            />
            <Button type="submit" label="Login" clicked={this.loginClickHandler} />
          </div>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogin: user => dispatch(Actions.login(user))
});

export default connect(
  null,
  mapDispatchToProps
)(RegisterForm);
