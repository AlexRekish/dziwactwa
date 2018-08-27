import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import http from '../../../services/httpService';
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
        http.error(err);
        return history.replace('/blog');
      }
      return http.error(err);
    }
  }

  editPostHandler = () => {
    const { post } = this.state;
    const { history } = this.props;
    history.push('/blog/edit', post);
  };

  deletePostHandler = async () => {
    const { post } = this.state;
    const { history } = this.props;
    try {
      await deletePost(post._id);
      http.success('Successful deleted');
      history.replace('/blog');
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          http.error(err);
          return history.replace('/blog');
        }
        return http.error(err);
      }
    }
  };

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
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
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
              <p className="post__content">{post.text}</p>
            </Scrollbars>
          </div>
        </article>
        {
          <ControlPanel>
            <div>
              <CloseIcon clicked={this.backButtonHandler} />
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
  user: state.auth.user
});

BlogPost.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object
};

BlogPost.defaultProps = {
  user: null
};

export default connect(mapStateToProps)(BlogPost);
