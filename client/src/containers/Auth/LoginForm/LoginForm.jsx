import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { connect } from 'react-redux';

import Button from '../../../common/Button/Button';
import { Actions } from '../../../store/actions/actions';
import withFormBlueprint from '../../../hoc/withFormBlueprint';
import '../Auth.sass';

class LoginForm extends Component {
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

  formSubmitHandler = evt => {
    evt.preventDefault();

    const { validate } = this.props;
    const errors = validate(this.state, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.onSubmitted();
  };

  onSubmitted = async () => {
    const { data } = this.state;
    const { onInitLogin, history } = this.props;
    onInitLogin(data.email, data.password, history);
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

  registerClickHandler = () => {
    const { history } = this.props;
    history.push('/register');
  };

  render() {
    const { renderInput, validate } = this.props;
    return (
      <section className="auth">
        <form className="auth__form" onSubmit={this.formSubmitHandler}>
          <h1 className="auth__header">Login</h1>
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
              type="submit"
              label="Login"
              clicked={this.formSubmitHandler}
              disabled={validate(this.state, this.schema)}
            />
            <Button type="button" label="Register" clicked={this.registerClickHandler} />
          </div>
        </form>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onInitLogin: (email, password, history) => dispatch(Actions.initLogin(email, password, history))
});

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,

  renderInput: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  onInitLogin: PropTypes.func.isRequired,
  validateProperty: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(withFormBlueprint(LoginForm));
