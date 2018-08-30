import React from 'react';
import './GalleryItem.sass';

const GalleryItem = ({ src, title, clicked, date }) => (
  <li className="gallery__photo-item">
    {/* eslint-disable */}
    <a tabIndex="0" onClick={clicked} className="gallery__photo-container">
      <img src={src} alt={title} className="gallery__photo" />
      <div className="gallery__photo-info-wrapper">
        <h2 className="gallery__photo-title">{title}</h2>
        <p className="gallery__photo-date">{date}</p>
      </div>
    </a>
    {/* eslint-enable */}
  </li>
);

export default GalleryItem;
