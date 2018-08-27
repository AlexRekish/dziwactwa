import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import http from '../../../services/httpService';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { editPost, getPost } from '../../../services/blogService';
import '../BlogForm/BlogPostForm';
import { Actions } from '../../../store/actions/actions';
import FileUploadForm from '../../../common/FileUploadForm/FileUploadForm';

class BlogPostEditForm extends Form {
  state = {
    data: {
      title: '',
      text: ''
    },
    photo: '',
    postId: '',
    errors: {}
  };

  async componentDidMount() {
    await this.populatePostData();
    this.props.onStartEditPost(this.state.photo);
  }

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

  populatePostData = async () => {
    const { history } = this.props;
    try {
      const postId = history.location.state._id;
      const { data: post } = await getPost(postId);
      this.setState({
        data: {
          title: post.title,
          text: post.text
        },
        postId,
        photo: post.photo
      });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        http.error(err);
        return history.replace('/blog');
      }
      http.err(err);
    }
  };

  onSubmitted = async () => {
    const { data, postId } = this.state;
    const { history, onEndEditPost, photo, imageLoaded } = this.props;

    if (!imageLoaded || !photo || !/.*localhost:3502\/img\/.*/i.test(photo)) {
      http.error(null, 'Photo is required!');
      return;
    }

    const post = {
      ...data,
      photo
    };

    try {
      await editPost(postId, post);
      http.success('Post successfully changed!');
      history.push('/blog');
      onEndEditPost();
    } catch (err) {
      if (err.response && err.response.status === 404) {
        http.error(err);
        return history.replace('/blog');
      }
      http.error(err);
    }
  };

  cancelHandler = () => {
    const { history, onEndEditPost } = this.props;
    history.goBack();
    onEndEditPost();
  };

  render() {
    const { photo, imageLoaded } = this.props;
    return (
      <section className="new-post">
        <FileUploadForm />
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">Edit post</h1>
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

const mapDispatchToProps = dispatch => ({
  onStartEditPost: photo => dispatch(Actions.startEditPost(photo)),
  onEndEditPost: () => dispatch(Actions.endEditPost())
});

BlogPostEditForm.propTypes = {
  history: PropTypes.object.isRequired,
  photo: PropTypes.string.isRequired,
  imageLoaded: PropTypes.bool.isRequired,
  onStartEditPost: PropTypes.func.isRequired,
  onEndEditPost: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPostEditForm);
