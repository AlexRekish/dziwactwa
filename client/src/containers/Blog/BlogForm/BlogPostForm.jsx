import React from 'react';
import Form from '../../../common/Form/Form';
import Button from '../../../common/Button/Button';

class BlogPostForm extends Form {
  state = {};

  render() {
    return (
      <form onSubmit={this.formSubmitHandler}>
        {this.renderInput('photo', 'Photo', 'Choose photo...', 'file')}
        {this.renderInput('title', 'Title', 'Enter title')}
        {this.renderTextArea()}
        <Button type="submit" label="Submit" clicked={this.formSubmitHandler} />
      </form>
    );
  }
}

export default BlogPostForm;
