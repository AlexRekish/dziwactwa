import React from 'react';
import './PhotoPreloader.sass';

const PhotoPreloader = () => (
  <div className="photo-preloader">
    <div className="photo-preloader__item photo-preloader__item--first" />
    <div className="photo-preloader__item photo-preloader__item--second" />
  </div>
);

export default PhotoPreloader;
