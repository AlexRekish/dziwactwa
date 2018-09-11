import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../common/Form/Input/Input';
import TextArea from '../common/Form/TextArea/TextArea';

const withFormBlueprint = FormComponent =>
  class FormBlueprint extends Component {
    state = {};

    validate = (state, schema) => {
      const { data } = state;
      const options = { abortEarly: false };
      const { error } = Joi.validate(data, schema, options);
      if (!error) return null;

      const errors = {};
      for (const item of error.details) {
        errors[item.path[0]] = item.message;
      }
      return errors;
    };

    validateProperty = ({ name, value }, schema) => {
      const obj = { [name]: value };
      const propSchema = { [name]: schema[name] };
      const { error } = Joi.validate(obj, propSchema);
      return error ? error.details[0].message : null;
    };

    renderInput = (name, label, placeholder, type = 'text', changeHandler, state) => {
      const { data, errors } = state;
      return (
        <Input
          type={type}
          name={name}
          label={label}
          onChange={changeHandler}
          value={data[name]}
          placeholder={placeholder}
          error={errors[name]}
        />
      );
    };

    renderTextArea = (name, label, placeholder, changeHandler, state) => {
      const { data, errors } = state;
      return (
        <TextArea
          name={name}
          label={label}
          placeholder={placeholder}
          onChange={changeHandler}
          value={data[name]}
          error={errors[name]}
        />
      );
    };

    render() {
      return (
        <FormComponent
          validate={this.validate}
          validateProperty={this.validateProperty}
          renderInput={this.renderInput}
          renderSelect={this.renderSelect}
          renderTextArea={this.renderTextArea}
          {...this.props}
        />
      );
    }
  };

export default withFormBlueprint;
