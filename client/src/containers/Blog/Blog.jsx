import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../../services/blogService';
import http from '../../services/httpService';
import ControlPanel from '../../common/ControlPanel/ControlPanel';
import Pagination from '../../common/Pagination/Pagination';
import './Blog.sass';
import paginate from '../../utils/paginate';
import parseStringToDate from '../../utils/date';
import Button from '../../common/Button/Button';
import SearchBox from '../../common/SearchBox/SearchBox';
import { Actions } from '../../store/actions/actions';
import Preloader from '../../common/Preloader/Preloader';

class Blog extends Component {
  state = {
    posts: [],
    pageSize: 5,
    currentPage: 1,
    searchString: ''
  };

  async componentDidMount() {
    const { onStartLoadData, onEndLoadData } = this.props;
    try {
      onStartLoadData();
      const { data: posts } = await getPosts();
      onEndLoadData();
      this.setState({ posts });
    } catch (err) {
      http.error(err);
    }
  }

  pageChangeHandler = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { posts, pageSize, currentPage, searchString } = this.state;
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
    return dataLoading || !posts.length ? (
      <Preloader />
    ) : (
      <section className="blog">
        {posts.map(post => (
          <Link to={`/blog/${post._id}`} className="blog__post-link" key={post._id}>
            <article className="blog__post">
              <div className="blog__img-wrapper">
                <img src={post.photo} alt="" className="blog__img" />
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
  dataLoading: state.load.dataLoading
});

const mapDispatchToProps = dispatch => ({
  onStartLoadData: () => dispatch(Actions.startLoad()),
  onEndLoadData: () => dispatch(Actions.endLoad())
});

Blog.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  dataLoading: PropTypes.bool.isRequired,
  onStartLoadData: PropTypes.func.isRequired,
  onEndLoadData: PropTypes.func.isRequired
};

Blog.defaultProps = {
  user: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);
