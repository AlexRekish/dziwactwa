import img1 from './assets/2.jpg';
import img2 from './assets/3.jpg';
import img3 from './assets/4.jpg';
import img4 from './assets/5.jpg';
import img5 from './assets/7.jpg';
import img6 from './assets/8.jpg';
import img7 from './assets/9.jpg';
import img8 from './assets/10.jpg';
import img9 from './assets/11.jpg';
import img10 from './assets/12.jpg';
import img11 from './assets/13.jpg';

const images = [img1, img2, img3, img4, img4, img5, img6, img7, img8, img9, img10, img11];

const randomBackground = () => {
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${images[Math.floor(Math.random() * 11)]})`;
};

export default randomBackground;
