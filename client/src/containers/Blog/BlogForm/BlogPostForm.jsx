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
      .required()
  };

  onSubmitted = async () => {
    const { data } = this.state;
    const { history } = this.props;
    try {
      await addNewPost(data);
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

  fileLoadHandler = evt => {
    // const { data } = { ...this.state };
    console.log(evt.target.files[0]);
    uploadImage(evt.target.files[0]);
    // this.setState({
    //   data: {
    //     ...data,
    //     selectedImage: evt.target.files[0]
    //   }
    // });
  };

  render() {
    return (
      <section className="new-post">
        <form onSubmit={this.formSubmitHandler} className="new-post__form">
          <h1 className="new-post__header">New post</h1>
          {this.renderInput('photo', 'Photo:', 'Choose photo...')}
          {/* <input type="file" onChange={this.fileLoadHandler} /> */}
          {this.renderInput('title', 'Title:', 'Enter title')}
          {this.renderTextArea('text', 'Text:', 'Enter your exciting story!')}
          <div className="new-post__buttons-wrapper">
            <Button
              type="submit"
              label="Submit"
              clicked={this.formSubmitHandler}
              disabled={this.validate()}
            />
            <Button type="cancel" label="Cancel" clicked={this.cancelHandler} />
          </div>
        </form>
      </section>
    );
  }
}

export default BlogPostForm;
