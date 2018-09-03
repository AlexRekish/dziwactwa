import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';

import http from '../../../services/httpService';
import Button from '../../../common/Button/Button';
import '../BlogForm/BlogPostForm';
import { Actions } from '../../../store/actions/actions';
import FileUploadForm from '../../../common/FileUploadForm/FileUploadForm';
import Preloader from '../../../common/Preloader/Preloader';
import withFormBlueprint from '../../../hoc/withFormBlueprint';

class BlogPostEditForm extends Component {
  state = {
    data: {
      title: '',
      text: ''
    },
    photo: '',
    postId: '',
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

  componentDidMount() {
    const { history, post, onStartEditPost } = this.props;
    if (!post.title) return history.replace('/blog');
    this.setState({
      data: {
        title: post.title,
        text: post.text
      },
      postId: post._id,
      photo: post.photo
    });
    onStartEditPost(post.photo);
  }

  formSubmitHandler = evt => {
    evt.preventDefault();

    const { validate } = this.props;
    const errors = validate(this.state, this.schema);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.onSubmitted();
  };

  onSubmitted = async () => {
    const { data, postId } = this.state;
    const { history, onEditPost, photo, imageLoaded } = this.props;

    if (!imageLoaded || !photo || !/.*localhost:3502\/img\/.*/i.test(photo)) {
      http.error(null, 'Photo is required!');
      return;
    }

    const post = {
      ...data,
      photo
    };

    onEditPost(postId, post, history);
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
    const { history, onEndEditPost } = this.props;
    history.goBack();
    onEndEditPost();
  };

  render() {
    const { photo, imageLoaded, renderInput, validate, renderTextArea } = this.props;
    const { data } = this.state;
    return !data.title ? (
      <Preloader />
    ) : (
      <section className="new-post">
        <FileUploadForm />
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">Edit post</h1>
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
  post: state.blog.post
});

const mapDispatchToProps = dispatch => ({
  onStartEditPost: photo => dispatch(Actions.startEditPost(photo)),
  onEditPost: (id, post, history) => dispatch(Actions.editPost(id, post, history)),
  onEndEditPost: () => dispatch(Actions.endEditPost())
});

BlogPostEditForm.propTypes = {
  history: PropTypes.object.isRequired,
  photo: PropTypes.string,
  imageLoaded: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired,

  onStartEditPost: PropTypes.func.isRequired,
  onEditPost: PropTypes.func.isRequired,
  onEndEditPost: PropTypes.func.isRequired,
  renderInput: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  validateProperty: PropTypes.func.isRequired,
  renderTextArea: PropTypes.func.isRequired
};

BlogPostEditForm.defaultProps = {
  photo: ''
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withFormBlueprint(BlogPostEditForm));
