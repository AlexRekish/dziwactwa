import React from 'react';
import PropTypes from 'prop-types';
import { onlyUpdateForKeys } from 'recompose';

import Button from '../Button/Button';
import './Modal.sass';

const visible = { visibility: 'visible', opacity: 1 };
const hidden = { visibility: 'hidden', opacity: 0 };

const Modal = ({ isOpen, confirm, decline }) => (
  <div className="modal" style={isOpen ? visible : hidden}>
    <div className="modal__content">
      <p className="modal__message">Are you want to continue?</p>
      <div className="modal__button-wrapper">
        <Button type="button" label="Yes" clicked={confirm} confirm />
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

export default onlyUpdateForKeys(['isOpen'])(Modal);
