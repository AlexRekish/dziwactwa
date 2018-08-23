import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './CloseIcon.sass';

const CloseIcon = ({ history }) => (
  <button type="button" className="close-icon" onClick={() => history.goBack()}>
    <FontAwesomeIcon icon="times" />
  </button>
);

export default CloseIcon;
