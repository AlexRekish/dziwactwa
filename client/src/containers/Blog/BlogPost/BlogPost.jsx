import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getPost, deletePost } from '../../../services/blogService';
import Button from '../../../common/Button/Button';
import ControlPanel from '../../../common/ControlPanel/ControlPanel';
import parseStringToDate from '../../../utils/date';
import './BlogPost.sass';
import '../Blog.sass';

class BlogPost extends Component {
  state = {
    post: {}
  };

  async componentDidMount() {
    const { match, history } = this.props;
    try {
      if (match.params.id === 'new') return;
      const { data: post } = await getPost(match.params.id);
      this.setState({ post });
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.message);
        return history.replace('/blog');
      }
    }
  }

  editPostHandler = () => {
    console.log('edit');
  };

  deletePostHandler = async () => {
    try {
      const { post } = this.state;
      const { history } = this.props;
      await deletePost(post._id);
      history.replace('/blog');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          toast.error('Post already deleted');
        } else {
          toast.error(err.message);
        }
      }
    }
  };

  render() {
    const { post } = this.state;
    const { user } = this.props;
    return (
      <section className="blog">
        <article className="post">
          <div className="post__photo-wrapper">
            <img src={post.photo} alt="" className="post__photo" />
          </div>
          <div className="post__content-wrapper">
            <h1 className="post__title">{post.title}</h1>
            <p className="post__date">{parseStringToDate(post.date)}</p>
            <p className="post__content">{post.text}</p>
          </div>
        </article>
        {user &&
          user.isAdmin && (
            <ControlPanel>
              <Button type="button" label="Edit" clicked={this.editPostHandler} />
              <Button type="button" label="Delete" clicked={this.deletePostHandler} danger />
            </ControlPanel>
          )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(BlogPost);
