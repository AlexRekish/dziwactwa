import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import './GalleryItem.sass';

const GalleryItem = ({ src, title, clicked, date }) => (
  <li className="gallery__photo-item">
    <a href="#item" onClick={clicked} className="gallery__photo-container">
      <LazyLoad once offset={200} scroll overflow height="100%">
        <img src={src} alt={title} className="gallery__photo" />
      </LazyLoad>
      <div className="gallery__photo-info-wrapper">
        <h2 className="gallery__photo-title">{title}</h2>
        <p className="gallery__photo-date">{date}</p>
      </div>
    </a>
  </li>
);

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,

  clicked: PropTypes.func.isRequired
};

export default GalleryItem;
