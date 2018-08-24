import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { addNewPost } from '../../../services/blogService';
import uploadImage from '../../../services/uploadImageService';
import './BlogPostFrom.sass';

class BlogPostForm extends Form {
  state = {
    data: {
      title: '',
      photo: '',
      text: '',
      selectedImage: null
    },
    errors: {}
  };

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
      .required(),
    selectedImage: Joi.object().required()
  };

  onSubmitted = async () => {
    const { data } = this.state;
    const { history } = this.props;
    try {
      await addNewPost({
        title: data.title,
        photo: data.photo,
        text: data.text
      });
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
          selectedImage,
          photo: reader.result
        }
      });
    });
    reader.readAsDataURL(evt.target.files[0]);
  };

  checkUploadImage = () => {
    const type = /^image.*/i;
    const { selectedImage } = this.state.data;
    if (!selectedImage) return;
    return selectedImage && type.test(selectedImage.type);
  };

  imageUploadHandler = async evt => {
    evt.preventDefault();
    if (!this.checkUploadImage()) return;
    const { data } = { ...this.state };
    const { selectedImage } = data;
    if (!selectedImage && !selectedImage.name) return;
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
        photo: '',
        selectedImage: null
      }
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
            <Button
              type="submit"
              label="Upload image"
              clicked={this.imageUploadHandler}
              disabled={!this.checkUploadImage()}
            />
            <Button type="reset" label="Clear image" clicked={this.clearImageUploadHandler} />
          </div>
        </form>
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">New post</h1>
          {this.renderInput('photo', 'Photo:', 'Photo link...', 'text', true)}
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

export default BlogPostForm;
