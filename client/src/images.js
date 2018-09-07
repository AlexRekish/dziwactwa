const images = new Array(15)
  .fill()
  .map((image, index) => `http://192.168.1.127:3502/backgrounds/${index + 1}.jpg`);

const randomBackground = () => {
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${images[Math.round(Math.random() * (15.5 - 1.5) + 0.5)]})`;
};

export default randomBackground;
