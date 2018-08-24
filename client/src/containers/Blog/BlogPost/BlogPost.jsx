import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars';
import { getPost, deletePost } from '../../../services/blogService';
import Button from '../../../common/Button/Button';
import ControlPanel from '../../../common/ControlPanel/ControlPanel';
import parseStringToDate from '../../../utils/date';
import './BlogPost.sass';
import '../Blog.sass';
import CloseIcon from '../../../common/CloseIcon/CloseIcon';

class BlogPost extends Component {
  state = {
    post: {}
  };

  async componentDidMount() {
    const { match, history } = this.props;
    try {
      if (match.params.id === 'new' || match.params.id === 'edit') return;
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
    const { post } = this.state;
    const { history } = this.props;
    history.push('/blog/edit', post);
  };

  deletePostHandler = async () => {
    try {
      const { post } = this.state;
      const { history } = this.props;
      await deletePost(post._id);
      toast.success('Successful deleted');
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
    const { user, history } = this.props;
    return (
      <section className="blog">
        <article className="post">
          <div className="post__photo-wrapper">
            <img src={post.photo} alt="" className="post__photo" />
          </div>

          <div className="post__content-wrapper">
            <h1 className="post__title">{post.title}</h1>
            <p className="post__date">{parseStringToDate(post.date)}</p>
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
              <p className="post__content">{post.text}</p>
            </Scrollbars>
          </div>
        </article>
        {
          <ControlPanel>
            <div>
              <CloseIcon history={history} />
            </div>
            {user &&
              user.isAdmin && (
                <div>
                  <Button type="button" label="Edit" clicked={this.editPostHandler} />
                  <Button type="button" label="Delete" clicked={this.deletePostHandler} danger />
                </div>
              )}
          </ControlPanel>
        }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(BlogPost);
