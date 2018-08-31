import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { connect } from 'react-redux';

import Button from '../../../common/Button/Button';
import { Actions } from '../../../store/actions/actions';
import withFormBlueprint from '../../../hoc/withFormBlueprint';
import '../Auth.sass';

class RegisterForm extends Component {
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

  formSubmitHandler = evt => {
    evt.preventDefault();

    const { validate } = this.props;
    const errors = validate(this.state, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.onSubmitted();
  };

  onSubmitted = () => {
    const { data: user } = this.state;
    const { onRegister, history } = this.props;
    onRegister(user, history);
  };

  fieldChangeHandler = ({ currentTarget: field }) => {
    const { errors, data } = { ...this.state };
    const { validateProperty } = this.props;
    const errorMessage = validateProperty(field, this.schema);
    if (errorMessage) {
      errors[field.name] = errorMessage;
    } else {
      delete errors[field.name];
    }

    data[field.name] = field.value;
    this.setState({ data, errors });
  };

  loginClickHandler = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    const { renderInput, validate } = this.props;
    return (
      <section className="auth">
        <form className="auth__form" onSubmit={this.formSubmitHandler}>
          <h1 className="auth__header">Register</h1>
          {renderInput(
            'name',
            'Name:',
            'Enter your name',
            'text',
            this.fieldChangeHandler,
            this.state
          )}
          {renderInput(
            'email',
            'Email:',
            'Enter your email',
            'email',
            this.fieldChangeHandler,
            this.state
          )}
          {renderInput(
            'password',
            'Password:',
            'Enter your password',
            'password',
            this.fieldChangeHandler,
            this.state
          )}
          <div className="auth__buttons-wrapper">
            <Button
              type="button"
              label="Register"
              clicked={this.formSubmitHandler}
              disabled={validate(this.state, this.schema)}
            />
            <Button type="submit" label="Login" clicked={this.loginClickHandler} />
          </div>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onRegister: (user, history) => dispatch(Actions.register(user, history))
});

RegisterForm.propTypes = {
  history: PropTypes.object.isRequired,

  onRegister: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validateProperty: PropTypes.func.isRequired,
  renderInput: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withFormBlueprint(RegisterForm));
