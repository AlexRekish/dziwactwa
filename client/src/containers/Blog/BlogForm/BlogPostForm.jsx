import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Button from '../../../common/Button/Button';
import { addNewPost } from '../../../services/blogService';
import http from '../../../services/httpService';
import FileUploadForm from '../../../common/FileUploadForm/FileUploadForm';
import './BlogPostFrom.sass';
import withFormBlueprint from '../../../hoc/withFormBlueprint';

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

  onSubmitted = async () => {
    const { data } = this.state;
    const { history, photo, imageLoaded } = this.props;

    if (!imageLoaded || !photo || !/.*localhost:3502\/img\/.*/i.test(photo)) {
      http.error(null, 'Photo is required!');
      return;
    }

    const post = {
      ...data,
      photo
    };
    try {
      await addNewPost(post);
      http.success('Post added!');
      history.push('/blog');
    } catch (err) {
      http.error(err);
    }
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
            15,
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
  imageLoaded: state.uploadImage.imageLoaded
});

BlogPostForm.propTypes = {
  history: PropTypes.object.isRequired,
  photo: PropTypes.string.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  renderInput: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validateProperty: PropTypes.func.isRequired,
  renderTextArea: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(withFormBlueprint(BlogPostForm));
