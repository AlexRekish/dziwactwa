import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { editPost, getPost } from '../../../services/blogService';
import uploadImage from '../../../services/uploadImageService';
import '../BlogForm/BlogPostForm';

class BlogPostEditForm extends Form {
  state = {
    data: {
      title: '',
      photo: '',
      text: ''
    },
    selectedImage: {},
    errors: {}
  };

  componentDidMount() {
    this.populatePostData();
  }

  schema = {
    _id: Joi.string(),
    date: Joi.date(),
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
      this.setState({ data: this.adaptPostToData(post) });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error('Post not found!');
        history.replace('/blog');
      }
    }
  };

  adaptPostToData = post => {
    const { _id, title, photo, text, date } = post;
    return {
      _id,
      title,
      photo,
      text,
      date
    };
  };

  onSubmitted = async () => {
    const { data } = this.state;
    console.log(data);
    const { history } = this.props;
    try {
      await editPost(data._id, data);
      toast.success('Post added!');
      history.push('/blog');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(err.message);
      }
    }
  };

  cancelHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  uploadPreviewImageHandler = evt => {
    const { data } = { ...this.state };
    const selectedImage = evt.target.files[0];
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
  };

  imageUploadHandler = async evt => {
    evt.preventDefault();
    const { data } = { ...this.state };
    const { selectedImage } = this.state;
    const { data: link } = await uploadImage(selectedImage);
    this.setState({
      data: {
        ...data,
        photo: link
      }
    });
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
    const { data } = this.state;
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
            <Button type="submit" label="Upload image" clicked={this.imageUploadHandler} />
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
