import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SocialItem.sass';

const SocialItem = ({ link, content, label }) => (
  <li className="social__item">
    <a href={link} target="_blank" rel="noopener noreferrer" className="social__link">
      <span className="visually-hidden">{label}</span>
      <FontAwesomeIcon icon={['fab', `${content}`]} />
    </a>
  </li>
);

SocialItem.propTypes = {
  link: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default SocialItem;
