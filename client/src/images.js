const images = new Array(15)
  .fill(1)
  .map((image, index) => `https://dziwactwa.herokuapp.com/img/backgrounds/${index + 1}.jpg`);

const randomBackground = () => {
  const body = document.querySelector('body');
  body.style.backgroundImage =
    window.innerWidth > 849 ? `url(${images[Math.round(Math.random() * (15.5 - 1.5) + 0.5)]})` : '';
};

export default randomBackground;
