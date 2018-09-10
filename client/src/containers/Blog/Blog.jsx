import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import paginate from '../../utils/paginate';
import ControlPanel from '../../common/ControlPanel/ControlPanel';
import Pagination from '../../common/Pagination/Pagination';
import Button from '../../common/Button/Button';
import SearchBox from '../../common/SearchBox/SearchBox';
import Preloader from '../../common/Preloader/Preloader';
import { Actions } from '../../store/actions/actions';
import BlogItem from './BlogItem/BlogItem';

import './Blog.sass';

class Blog extends Component {
  state = {
    pageSize: 14,
    currentPage: 1,
    searchString: ''
  };

  componentDidMount() {
    const { onStartLoadPosts } = this.props;
    onStartLoadPosts();
  }

  pageChangeHandler = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, searchString } = this.state;
    const { posts } = this.props;
    const paginatedPosts = searchString
      ? paginate(this.filterPosts(posts, searchString), currentPage, pageSize)
      : paginate(posts, currentPage, pageSize);
    return { totalCount: posts.length, paginatedPosts };
  };

  addPostHandler = () => {
    const { history } = this.props;
    history.push('/blog/new');
  };

  searchHandler = string => {
    this.setState({ searchString: string, currentPage: 1 });
  };

  filterPosts = (posts, searchString) => {
    const reg = new RegExp(`^${searchString}`, 'i');
    return posts.filter(post => reg.test(post.title));
  };

  render() {
    const { pageSize, currentPage, searchString } = this.state;
    const { user, dataLoading } = this.props;
    const { totalCount, paginatedPosts: posts } = this.getPagedData();
    return dataLoading ? (
      <Preloader />
    ) : (
      <section className="blog">
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} hideTracksWhenNotNeeded>
          <div className="blog__posts-wrapper">
            {posts.map(post => (
              <BlogItem post={post} key={post._id} />
            ))}
          </div>
        </Scrollbars>
        <ControlPanel>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChanged={this.pageChangeHandler}
            currentPage={currentPage}
          />
          {user &&
            user.isAdmin && (
              <Button
                type="button"
                label={window.innerWidth > 1366 ? 'Add post' : '+'}
                clicked={this.addPostHandler}
              />
            )}
        </ControlPanel>
        <SearchBox value={searchString} onChange={this.searchHandler} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  dataLoading: state.load.dataLoading,
  posts: state.blog.posts
});

const mapDispatchToProps = dispatch => ({
  onStartLoadPosts: () => dispatch(Actions.startLoadPosts())
});

Blog.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  dataLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),

  onStartLoadPosts: PropTypes.func.isRequired
};

Blog.defaultProps = {
  user: null,
  posts: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
