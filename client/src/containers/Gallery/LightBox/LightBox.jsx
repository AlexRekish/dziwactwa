import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from '../../../common/Modal/Modal';

import './LightBox.sass';

const grid = { display: 'grid' };
const hidden = { display: 'none' };
class LightBox extends Component {
  state = {
    xStart: null,
    modalIsOpen: false
  };

  touchStartHandler = evt => {
    const { xStart } = this.state;
    if (evt.changedTouches.length !== 1 || xStart !== null) return;
    this.setState({ xStart: evt.changedTouches[0].clientX });
  };

  touchEndHandler = evt => {
    const { xStart } = this.state;
    const { onNext, onPrev } = this.props;

    if (xStart === null) return;

    const xEnd = evt.changedTouches[0].clientX;
    const xDiff = xStart - xEnd;
    if (Math.abs(xDiff) > 100) {
      if (xDiff < 0) {
        onPrev();
        this.setState({
          xStart: null
        });
      }
      if (xDiff > 0) {
        onNext();
        this.setState({
          xStart: null
        });
      }
    }
  };

  modalOpenHandler = () => {
    this.setState({ modalIsOpen: true });
  };

  modalConfirmHandler = () => {
    const { onDelete } = this.props;
    onDelete();
    this.setState({ modalIsOpen: false });
  };

  modalDeclineHandler = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { src, title, date, user, current, count, isOpen, onNext, onPrev, onClose } = this.props;
    const { modalIsOpen } = this.state;
    return (
      <div
        className="lightbox"
        style={isOpen ? grid : hidden}
        onTouchStart={this.touchStartHandler}
        onTouchEnd={this.touchEndHandler}
      >
        <button
          type="button"
          className="lightbox__control lightbox__control--left"
          onClick={onPrev}
        >
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
                  onClick={this.modalOpenHandler}
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
        <button
          type="button"
          className="lightbox__control lightbox__control--right"
          onClick={onNext}
        >
          <span className="visually-hidden">next</span>
          <FontAwesomeIcon icon="chevron-right" />
        </button>
        <Modal
          isOpen={modalIsOpen}
          confirm={this.modalConfirmHandler}
          decline={this.modalDeclineHandler}
        />
      </div>
    );
  }
}

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
