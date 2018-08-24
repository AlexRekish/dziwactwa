import React from 'react';
import { toast } from 'react-toastify';
import Joi from 'joi-browser';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';
import { editPost, getPost } from '../../../services/blogService';
import '../BlogForm/BlogPostForm';

class BlogPostEditForm extends Form {
  state = {
    data: {
      title: '',
      photo: '',
      text: ''
    },
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

  render() {
    return (
      <section className="new-post">
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
