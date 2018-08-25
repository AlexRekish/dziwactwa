import React from 'react';
import Joi from 'joi-browser';
import http from '../../../services/httpService';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { editPost, getPost } from '../../../services/blogService';
import uploadImage, { validateFileType } from '../../../services/uploadImageService';
import '../BlogForm/BlogPostForm';

class BlogPostEditForm extends Form {
  state = {
    data: {
      title: '',
      photo: '',
      text: ''
    },
    postId: '',
    selectedImage: {},
    errors: {}
  };

  componentDidMount() {
    this.populatePostData();
  }

  schema = {
    title: Joi.string()
      .min(3)
      .max(255)
      .required(),
    photo: Joi.string()
      .min(5)
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
      this.setState({ data: this.adaptPostToData(post), postId });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        http.error(err);
        return history.replace('/blog');
      }
      http.err(err);
    }
  };

  adaptPostToData = post => {
    const { title, photo, text } = post;
    return {
      title,
      photo,
      text
    };
  };

  onSubmitted = async () => {
    const { data, postId } = this.state;
    const { history } = this.props;
    try {
      await editPost(postId, data);
      http.success('Post succesfully changed!');
      history.push('/blog');
    } catch (err) {
      if (err.response && err.response.status === 404) {
        http.error(err);
        return history.replace('/blog');
      }
      http.error(err);
    }
  };

  cancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  uploadPreviewImageHandler = evt => {
    const { data } = { ...this.state };
    const selectedImage = evt.target.files[0];
    if (validateFileType(selectedImage)) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.setState({
          data: {
            ...data,
            photo: reader.result
          },
          selectedImage
        });
      });
      reader.readAsDataURL(evt.target.files[0]);
    } else return http.error(null, 'Wrong file type');
  };

  imageUploadHandler = async evt => {
    evt.preventDefault();
    const { data } = { ...this.state };
    const { selectedImage } = this.state;
    if (!validateFileType(selectedImage)) return;
    try {
      const { data: link } = await uploadImage(selectedImage);
      this.setState({
        data: {
          ...data,
          photo: link
        }
      });
    } catch (err) {
      http.error(err);
    }
  };

  clearImageUploadHandler = () => {
    const { data } = { ...this.state };
    this.setState({
      data: {
        ...data,
        photo: ''
      },
      selectedImage: {}
    });
  };

  render() {
    const { data, selectedImage } = this.state;
    return (
      <section className="new-post">
        <form onSubmit={this.imageUploadHandler} className="new-post__form">
          <div className="new-post__photo-wrapper">
            <img src={data.photo} alt="" className="new-post__img-preview" />
          </div>
          <input
            type="file"
            onChange={this.uploadPreviewImageHandler}
            name="image"
            className="new-post__file-input"
          />
          <div className="new-post__buttons-wrapper">
            <Button
              type="submit"
              label="Upload image"
              clicked={this.imageUploadHandler}
              disabled={!validateFileType(selectedImage)}
            />
            <Button type="reset" label="Clear image" clicked={this.clearImageUploadHandler} />
          </div>
        </form>
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">Edit post</h1>
          {this.renderInput('photo', 'Photo:', 'Choose photo...')}
          {this.renderInput('title', 'Title:', 'Enter title')}
          {this.renderTextArea('text', 'Text:', 'Enter your exciting story!')}
          <div className="new-post__buttons-wrapper">
            <Button
              type="submit"
              label="Submit"
              clicked={this.formSubmitHandler}
              disabled={this.validate()}
            />
            <Button type="button" label="Cancel" clicked={this.cancelHandler} />
          </div>
        </form>
      </section>
    );
  }
}

export default BlogPostEditForm;
