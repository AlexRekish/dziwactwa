import React from 'react';
import PropTypes from 'prop-types';
import { pure } from 'recompose';
import './PhotoPreloader.sass';

const visible = { opacity: 1 };
const hidden = { opacity: 0 };

const PhotoPreloader = ({ loaded }) => (
  <div className="photo-preloader" style={loaded ? hidden : visible}>
    <div className="photo-preloader__item photo-preloader__item--first" />
    <div className="photo-preloader__item photo-preloader__item--second" />
  </div>
);

PhotoPreloader.propTypes = {
  loaded: PropTypes.bool.isRequired
};

export default pure(PhotoPreloader);
