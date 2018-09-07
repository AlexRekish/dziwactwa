import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import './Modal.sass';

const Modal = ({ isOpen, confirm, decline }) => (
  <div
    className="modal"
    style={{ visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? '1' : '0' }}
  >
    <div className="modal__content">
      <p className="modal__message">Are you want to continue?</p>
      <div className="modal__button-wrapper">
        <Button type="button" label="Yes" clicked={confirm} />
        <Button type="button" label="Cancel" clicked={decline} danger />
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,

  confirm: PropTypes.func.isRequired,
  decline: PropTypes.func.isRequired
};

export default Modal;
