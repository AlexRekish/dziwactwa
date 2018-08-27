import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { addNewPost } from '../../../services/blogService';
import http from '../../../services/httpService';
import FileUploadForm from '../../../common/FileUploadForm/FileUploadForm';
import './BlogPostFrom.sass';

class BlogPostForm extends Form {
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

  cancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { photo, imageLoaded } = this.props;
    return (
      <section className="new-post">
        <FileUploadForm />
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">New post</h1>
          {this.renderInput('title', 'Title:', 'Enter title')}
          {this.renderTextArea('text', 'Text:', 'Enter your exciting story!', 15)}
          <div className="new-post__buttons-wrapper">
            <Button
              type="submit"
              label="Submit"
              clicked={this.formSubmitHandler}
              disabled={this.validate() || !imageLoaded || !photo}
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
  imageLoaded: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(BlogPostForm);
