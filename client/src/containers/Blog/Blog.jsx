import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';

import paginate from '../../utils/paginate';
import parseStringToDate from '../../utils/date';
import ControlPanel from '../../common/ControlPanel/ControlPanel';
import Pagination from '../../common/Pagination/Pagination';
import Button from '../../common/Button/Button';
import SearchBox from '../../common/SearchBox/SearchBox';
import Preloader from '../../common/Preloader/Preloader';
import { Actions } from '../../store/actions/actions';
import './Blog.sass';

class Blog extends Component {
  state = {
    pageSize: 5,
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
        {posts.map(post => (
          <Link to={`/blog/${post._id}`} className="blog__post-link" key={post._id}>
            <article className="blog__post">
              <div className="blog__img-wrapper">
                <LazyLoad once offset={200} scroll overflow height="100%">
                  <img src={post.photo} alt={post.title} className="blog__img" />
                </LazyLoad>
              </div>
              <div className="blog__header-wrapper">
                <h2 className="blog__title">{post.title}</h2>
                <p className="blog__date">{parseStringToDate(post.date)}</p>
              </div>
            </article>
          </Link>
        ))}
        <ControlPanel>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChanged={this.pageChangeHandler}
            currentPage={currentPage}
          />
          {user &&
            user.isAdmin && <Button type="button" label="Add post" clicked={this.addPostHandler} />}
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
