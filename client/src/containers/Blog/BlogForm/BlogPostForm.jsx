import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';

import Button from '../../../common/Button/Button';
import FileUploadForm from '../../../common/FileUploadForm/FileUploadForm';
import withFormBlueprint from '../../../hoc/withFormBlueprint';
import { Actions } from '../../../store/actions/actions';
import http from '../../../services/httpService';
import './BlogPostFrom.sass';

class BlogPostForm extends Component {
  state = {
    data: {
      title: '',
      text: ''
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    text: Joi.string()
      .min(10)
      .max(5000)
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
    const { history, photo, imageLoaded, onStartAddPost, user } = this.props;

    if (!imageLoaded || !photo || !/.*dziwactwa-b0813.*/i.test(photo)) {
      http.error(null, 'Photo is required!');
      return;
    }

    const post = {
      ...data,
      photo
    };
    onStartAddPost(post, history, user);
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
    const { history, onClearImage } = this.props;
    history.goBack();
    onClearImage();
  };

  render() {
    const { photo, imageLoaded, renderInput, validate, renderTextArea } = this.props;
    return (
      <section className="new-post">
        <FileUploadForm />
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">New post</h1>
          {renderInput(
            'title',
            'Title:',
            'Enter title',
            'text',
            this.fieldChangeHandler,
            this.state
          )}
          {renderTextArea(
            'text',
            'Text:',
            'Enter your exciting story!',
            this.fieldChangeHandler,
            this.state
          )}
          <div className="new-post__buttons-wrapper">
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
  onStartAddPost: (post, history, user) => dispatch(Actions.startAddPost(post, history, user)),
  onClearImage: () => dispatch(Actions.clearImage())
});

BlogPostForm.propTypes = {
  history: PropTypes.object.isRequired,
  photo: PropTypes.string.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  user: PropTypes.object,

  renderInput: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validateProperty: PropTypes.func.isRequired,
  renderTextArea: PropTypes.func.isRequired,
  onStartAddPost: PropTypes.func.isRequired,
  onClearImage: PropTypes.func.isRequired
};

BlogPostForm.defaultProps = {
  user: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormBlueprint(BlogPostForm));
