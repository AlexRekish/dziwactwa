import React from 'react';
import PropTypes from 'prop-types';
import './PhotoPreloader.sass';

const PhotoPreloader = ({ loaded }) => (
  <div className="photo-preloader" style={{ opacity: loaded ? 0 : 1 }}>
    <div className="photo-preloader__item photo-preloader__item--first" />
    <div className="photo-preloader__item photo-preloader__item--second" />
  </div>
);

PhotoPreloader.propTypes = {
  loaded: PropTypes.bool.isRequired
};

export default PhotoPreloader;
