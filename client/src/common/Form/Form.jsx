import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input/Input';
import Select from './Select/Select';
import './Form.sass';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  formSubmitHandler = evt => {
    evt.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.onSubmitted();
  };

  inputChangeHandler = ({ currentTarget: input }) => {
    const { errors, data } = { ...this.state };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput = (name, label, placeholder, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        onChange={this.inputChangeHandler}
        value={data[name]}
        placeholder={placeholder}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        options={options}
        name={name}
        label={label}
        error={errors[name]}
        onChange={this.inputChangeHandler}
        value={data[name]}
      />
    );
  };
}

export default Form;
