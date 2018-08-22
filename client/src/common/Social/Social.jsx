import React from 'react';
import SocialItem from './SocialItem/SocialItem';
import './Social.sass';

const socialLinks = [
  { link: 'https://twitter.com/Alice_May_Cry', label: 'Twitter', content: 'twitter' },
  { link: 'https://vk.com/alicemaycry', label: 'VK', content: 'vk' },
  { link: 'https://www.instagram.com/alice_may_cry/', label: 'Instagram', content: 'instagram' },
  { link: 'https://facebook.com/marikamaycry', label: 'Facebook', content: 'facebook' }
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
