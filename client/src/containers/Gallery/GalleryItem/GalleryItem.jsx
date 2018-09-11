import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import PhotoPreloader from '../../../common/PhotoPreloader/PhotoPreloader';
import './GalleryItem.sass';

const imgLoadedStyle = { opacity: 1 };
const imgNotLoadedStyle = { opacity: 0 };

class GalleryItem extends Component {
  state = {
    loaded: false
  };

  loadImageHandler = () => {
    this.setState({ loaded: true });
  };

  render() {
    const { src, title, clicked, date } = this.props;
    const { loaded } = this.state;
    return (
      <li className="gallery__photo-item">
        <a href="#item" onClick={clicked} className="gallery__photo-container">
          <LazyLoad once offset={200} scroll overflow height="100%">
            <img
              src={src}
              alt={title}
              className="gallery__photo"
              onLoad={this.loadImageHandler}
              style={loaded ? imgLoadedStyle : imgNotLoadedStyle}
            />
          </LazyLoad>
          <div className="gallery__photo-info-wrapper">
            <h2 className="gallery__photo-title">{title}</h2>
            <p className="gallery__photo-date">{date}</p>
          </div>
        </a>
        <PhotoPreloader loaded={loaded} />
      </li>
    );
  }
}

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,

  clicked: PropTypes.func.isRequired
};

export default GalleryItem;
