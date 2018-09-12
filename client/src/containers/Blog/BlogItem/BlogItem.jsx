import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import parseStringToDate from '../../../utils/date';
import PhotoPreloader from '../../../common/PhotoPreloader/PhotoPreloader';

import './BlogItem.sass';

const visible = { opacity: 1 };
const hidden = { opacity: 0 };

class BlogItem extends Component {
  state = {
    loaded: false
  };

  loadImageHandler = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { post } = this.props;
    const { loaded } = this.state;
    return (
      <Link to={`/blog/${post._id}`} className="blog__post-link">
        <article className="blog__post">
          <div className="blog__img-wrapper">
            <LazyLoad once offset={200} scroll overflow height="100%">
              <img
                src={post.photo}
                alt={post.title}
                className="blog__img"
                onLoad={this.loadImageHandler}
                style={loaded ? visible : hidden}
              />
            </LazyLoad>
            <PhotoPreloader loaded={loaded} />
          </div>
          <div className="blog__header-wrapper">
            <h2 className="blog__title">{post.title}</h2>
            <p className="blog__date">{parseStringToDate(post.date)}</p>
          </div>
        </article>
      </Link>
    );
  }
}

BlogItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogItem;
