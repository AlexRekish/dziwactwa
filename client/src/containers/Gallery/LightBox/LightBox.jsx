import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LightBox.sass';

const LightBox = ({
  src,
  title,
  date,
  user,
  current,
  count,
  isOpen,
  onNext,
  onPrev,
  onClose,
  onDelete
}) => (
  <div className="lightbox" style={isOpen ? { display: 'grid' } : { display: 'none' }}>
    <button type="button" className="lightbox__control" onClick={onPrev}>
      <span className="visually-hidden">prev</span>
      <FontAwesomeIcon icon="chevron-left" />
    </button>
    <article className="lightbox__item">
      <div className="lightbox__photo-wrapper">
        <img src={src} alt={title} className="lightbox__photo" />
        <button
          type="button"
          className="lightbox__button lightbox__button--close"
          onClick={onClose}
        >
          <span className="visually-hidden">close</span>
          <FontAwesomeIcon icon="times" />
        </button>
        {user &&
          user.isAdmin && (
            <button
              type="button"
              className="lightbox__button lightbox__button--delete"
              onClick={onDelete}
            >
              <span className="visually-hidden">close</span>
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          )}
      </div>
      <div className="lightbox__photo-info">
        <h2 className="lightbox__photo-title">{title}</h2>
        <p className="lightBox__photo-date">{date}</p>
        <p className="lightbox__counter">{`${current}/${count}`}</p>
      </div>
    </article>
    <button type="button" className="lightbox__control" onClick={onNext}>
      <span className="visually-hidden">next</span>
      <FontAwesomeIcon icon="chevron-right" />
    </button>
  </div>
);

LightBox.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  user: PropTypes.object,
  current: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,

  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

LightBox.defaultProps = {
  src: '',
  title: '',
  date: '',
  user: {}
};

export default LightBox;
