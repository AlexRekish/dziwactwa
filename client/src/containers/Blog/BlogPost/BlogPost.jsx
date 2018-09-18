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
import Modal from '../../../common/Modal/Modal';
import '../Blog.sass';
import './BlogPost.sass';

const scrollbarsStyle = {
  width: '100%',
  height: '100%',
  maxWidth: '100%'
};

const visible = { opacity: 1 };
const hidden = { opacity: 0 };

export class BlogPost extends Component {
  state = {
    loaded: false,
    modalIsOpen: false
  };

  componentDidMount() {
    const { match, history, onStartLoadPost } = this.props;
    if (match.params.id === 'new' || match.params.id === 'edit') return;
    onStartLoadPost(match.params.id, history);
  }

  editPostHandler = () => {
    const { history, post } = this.props;
    history.push('/blog/edit', post);
  };

  backButtonHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  loadImageHandler = () => {
    this.setState({ loaded: true });
  };

  modalOpenHandler = () => {
    this.setState({ modalIsOpen: true });
  };

  modalConfirmHandler = () => {
    const { history, post, onStartDeletePost, user } = this.props;
    onStartDeletePost(post._id, history, user);
    this.setState({ modalIsOpen: false });
  };

  modalDeclineHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { user, dataLoading, post } = this.props;
    const { loaded, modalIsOpen } = this.state;
    return dataLoading ? (
      <Preloader />
    ) : (
      <section className="blog blog--post">
        <article className="post">
          <div className="post__photo-wrapper">
            <img
              src={post.photo}
              alt={post.title}
              className="post__photo"
              onLoad={this.loadImageHandler}
              style={loaded ? visible : hidden}
            />
          </div>

          <div className="post__content-wrapper">
            <h1 className="post__title">{post.title}</h1>
            <p className="post__date">{parseStringToDate(post.date)}</p>
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
              hideTracksWhenNotNeeded
              style={scrollbarsStyle}
            >
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
                <div className="control-panel__button-wrapper">
                  <Button type="button" label="Edit" clicked={this.editPostHandler} />
                  <Button type="button" label="Delete" clicked={this.modalOpenHandler} danger />
                </div>
              )}
          </ControlPanel>
        }
        <Modal
          isOpen={modalIsOpen}
          confirm={this.modalConfirmHandler}
          decline={this.modalDeclineHandler}
        />
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
  onStartDeletePost: (id, history, user) => dispatch(Actions.startDeletePost(id, history, user))
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
