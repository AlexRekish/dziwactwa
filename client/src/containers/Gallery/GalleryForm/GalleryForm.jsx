import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';

import http from '../../../services/httpService';
import Button from '../../../common/Button/Button';
import FileUploadForm from '../../../common/FileUploadForm/FileUploadForm';
import withFormBlueprint from '../../../hoc/withFormBlueprint';
import { Actions } from '../../../store/actions/actions';
import './GalleryForm.sass';

class GalleryForm extends Component {
  state = {
    data: {
      title: ''
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .min(3)
      .max(255)
      .required()
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
    const { data } = this.state;
    const { history, photo, imageLoaded, onStartAddImage, user } = this.props;

    if (!imageLoaded || !photo || !/.*dziwactwa-b0813.*/i.test(photo)) {
      http.error(null, 'Photo is required!');
      return;
    }

    const image = {
      ...data,
      path: photo
    };
    onStartAddImage(image, history, user);
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

  cancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { photo, imageLoaded, renderInput, validate } = this.props;
    return (
      <section className="new-photo">
        <FileUploadForm />
        <form onSubmit={this.formSubmitHandler} className="new-photo__form">
          <h1 className="new-photo__header">New photo</h1>
          {renderInput(
            'title',
            'Title:',
            'Enter title',
            'text',
            this.fieldChangeHandler,
            this.state
          )}
          <div className="new-photo__buttons-wrapper">
            <Button
              type="submit"
              label="Submit"
              clicked={this.formSubmitHandler}
              disabled={validate(this.state, this.schema) || !imageLoaded || !photo}
            />
            <Button type="button" label="Cancel" clicked={this.cancelHandler} />
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.uploadImage.photo,
  imageLoaded: state.uploadImage.imageLoaded,
  user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
  onStartAddImage: (image, history, user) => dispatch(Actions.startAddImage(image, history, user))
});

GalleryForm.propTypes = {
  history: PropTypes.object.isRequired,
  photo: PropTypes.string.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  user: PropTypes.object,

  renderInput: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validateProperty: PropTypes.func.isRequired,
  onStartAddImage: PropTypes.func.isRequired
};

GalleryForm.defaultProps = {
  user: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormBlueprint(GalleryForm));
