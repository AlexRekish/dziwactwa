import React from 'react';
import Joi from 'joi-browser';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { login } from '../../../services/authService';
import '../Auth.sass';

class LoginForm extends Form {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .min(5)
      .max(50)
      .required()
      .email()
      .label('email'),
    password: Joi.string()
      .min(10)
      .max(24)
      .required()
      .label('Password')
  };

  onSubmitted = async () => {
    const { data } = this.state;
    try {
      await login(data.email, data.password);
      window.location = '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const { errors } = { ...this.state };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  registerClickHandler = () => {
    const { history } = this.props;
    history.push('/register');
  };

  render() {
    return (
      <section className="auth">
        <form className="auth__form" onSubmit={this.formSubmitHandler}>
          <h1 className="auth__header">Login</h1>
          {this.renderInput('email', 'Email', 'Enter your email', 'email')}
          {this.renderInput('password', 'Password', 'Enter your password', 'password')}
          <div className="auth__buttons-wrapper">
            <Button
              type="submit"
              label="Login"
              clicked={this.formSubmitHandler}
              disabled={this.validate()}
            />
            <Button type="button" label="Register" clicked={this.registerClickHandler} />
          </div>
        </form>
      </section>
    );
  }
}

export default LoginForm;
