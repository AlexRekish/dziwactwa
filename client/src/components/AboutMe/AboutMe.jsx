import React from 'react';
import './AboutMe.sass';
import placeholder from '../../assets/placeholder2.png';

const AboutMe = () => (
  <section className="about-me">
    <div className="about-me__content-wrapper">
      <h1 className="about-me__greetings">About Me</h1>
      <p className="about-me__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias nihil exercitationem quis
        voluptate voluptatem odio mollitia molestiae dicta adipisci impedit, ab asperiores nisi!
        Dolores ex illum officia doloribus officiis obcaecati consequatur! Praesentium aliquam est
        libero voluptatibus cum animi, modi ratione error? Similique repellendus veniam in non,
        delectus temporibus quam neque eveniet. Similique animi illum soluta minus, veniam vero
        impedit sit autem totam, deserunt temporibus in. Esse facere necessitatibus sunt nisi atque
        voluptate blanditiis error, sit ad dolorum consequuntur eligendi temporibus illo illum
        perferendis quibusdam nulla dolorem quod cumque aliquam accusantium voluptatem quasi dolores
        repellendus? Officia itaque harum porro debitis ullam?
      </p>
    </div>
    <div className="photo-wrapper">
      <img src={placeholder} alt="placeholder" />
    </div>
  </section>
);

export default AboutMe;
