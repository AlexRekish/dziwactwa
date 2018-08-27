import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CloseIcon.sass';

const CloseIcon = ({ clicked }) => (
  <button type="button" className="close-icon" onClick={clicked}>
    <FontAwesomeIcon icon="arrow-left" />
    <p className="close-icon__description">Back</p>
  </button>
);

CloseIcon.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default CloseIcon;
