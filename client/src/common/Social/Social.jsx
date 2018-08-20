import React from 'react';
import SocialItem from './SocialItem/SocialItem';
import './Social.sass';

const socialLinks = [
  { link: '#', label: 'Twitter', content: 'twitter' },
  { link: '#', label: 'VK', content: 'vk' },
  { link: '#', label: 'Instagram', content: 'instagram' },
  { link: '#', label: 'Facebook', content: 'facebook' }
];

const Social = () => (
  <div className="social">
    <ul className="social__list">
      {socialLinks.map(link => (
        <SocialItem key={link.content} link={link.link} content={link.content} label={link.label} />
      ))}
    </ul>
  </div>
);

export default Social;
