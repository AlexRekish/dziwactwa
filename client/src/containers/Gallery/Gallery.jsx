import React, { Component } from 'react';
import './Gallery.sass';

const photos = [
  { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
  { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
  { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
  { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 }
];

class Gallery extends Component {
  state = {
    currentImage: 0
  };

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  };

  gotoPrevious = () => {
    this.setState(prevState => ({
      currentImage: prevState.currentImage - 1
    }));
  };

  gotoNext = () => {
    this.setState(prevState => ({
      currentImage: prevState.currentImage + 1
    }));
  };

  render() {
    return (
      <section className="gallery">
        {photos.map(photo => (
          <div className="gallery__photo-wrapper" key={photo.src}>
            <img src={photo.src} alt={photo.src} className="gallery__photo" />
          </div>
        ))}
      </section>
    );
  }
}

export default Gallery;
