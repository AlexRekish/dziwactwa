import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPosts } from '../../services/blogService';
import ControlPanel from '../../common/ControlPanel/ControlPanel';
import Pagination from '../../common/Pagination/Pagination';
import './Blog.sass';
import paginate from '../../utils/paginate';
import parseStringToDate from '../../utils/date';
import Button from '../../common/Button/Button';

class Blog extends Component {
  state = {
    posts: [],
    pageSize: 5,
    currentPage: 1
  };

  async componentDidMount() {
    const { data: posts } = await getPosts();
    const sortedPosts = posts.sort((a, b) => Date.parse(a.date) < Date.parse(b.date));
    this.setState({ posts: sortedPosts });
  }

  pageChangeHandler = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { posts, pageSize, currentPage } = this.state;
    const paginatedPosts = paginate(posts, currentPage, pageSize);
    return { totalCount: posts.length, paginatedPosts };
  };

  addPostHandler = () => {
    const { history } = this.props;
    history.push('/blog/new');
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { user } = this.props;
    const { totalCount, paginatedPosts: posts } = this.getPagedData();
    return posts ? (
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
      </section>
    ) : null;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Blog);
