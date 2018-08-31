import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import Button from '../../../common/Button/Button';
import ControlPanel from '../../../common/ControlPanel/ControlPanel';
import { Actions } from '../../../store/actions/actions';
import parseStringToDate from '../../../utils/date';
import CloseIcon from '../../../common/CloseIcon/CloseIcon';
import Preloader from '../../../common/Preloader/Preloader';
import './BlogPost.sass';
import '../Blog.sass';

class BlogPost extends Component {
  state = {};

  async componentDidMount() {
    const { match, history, onStartLoadPost } = this.props;
    if (match.params.id === 'new' || match.params.id === 'edit') return;
    onStartLoadPost(match.params.id, history);
  }

  editPostHandler = () => {
    const { history, post } = this.props;
    history.push('/blog/edit', post);
  };

  deletePostHandler = async () => {
    const { history, post, onStartDeletePost } = this.props;
    onStartDeletePost(post._id, history);
  };

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { user, dataLoading, post } = this.props;
    return dataLoading || !post.title ? (
      <Preloader />
    ) : (
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
  user: state.auth.user,
  dataLoading: state.load.dataLoading,
  post: state.blog.post
});

const mapDispatchToProps = dispatch => ({
  onStartLoadPost: (id, history) => dispatch(Actions.startLoadPost(id, history)),
  onStartDeletePost: (id, history) => dispatch(Actions.startDeletePost(id, history))
});

BlogPost.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  post: PropTypes.object,
  dataLoading: PropTypes.bool.isRequired,

  onStartLoadPost: PropTypes.func.isRequired,
  onStartDeletePost: PropTypes.func.isRequired
};

BlogPost.defaultProps = {
  user: null,
  post: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPost);
