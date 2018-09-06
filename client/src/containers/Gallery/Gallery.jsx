import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import parseStringToDate from '../../utils/date';
import SearchBox from '../../common/SearchBox/SearchBox';
import ControlPanel from '../../common/ControlPanel/ControlPanel';
import Button from '../../common/Button/Button';
import LightBox from './LightBox/LightBox';
import GalleryItem from './GalleryItem/GalleryItem';
import Preloader from '../../common/Preloader/Preloader';
import { Actions } from '../../store/actions/actions';
import './Gallery.sass';

const KeyCode = {
  ESC: 27,
  RIGHT: 39,
  LEFT: 37
};

class Gallery extends Component {
  state = {
    searchString: ''
  };

  componentDidMount() {
    const { onStartLoadImages } = this.props;
    onStartLoadImages();
  }

  openLightBoxHandler = (evt, index) => {
    evt.preventDefault();
    document.addEventListener('keydown', this.keyDownHandler);
    const { onOpenLightBox } = this.props;
    onOpenLightBox(index);
  };

  closeLightBoxHandler = () => {
    const { onCloseLightBox } = this.props;
    document.removeEventListener('keydown', this.keyDownHandler);
    onCloseLightBox();
  };

  keyDownHandler = evt => {
    const { onCloseLightBox, onNextImage, onPrevImage } = this.props;
    if (evt.keyCode === KeyCode.ESC) return onCloseLightBox();
    if (evt.keyCode === KeyCode.RIGHT) return onNextImage();
    if (evt.keyCode === KeyCode.LEFT) return onPrevImage();
  };

  searchHandler = string => {
    this.setState({ searchString: string });
  };

  addImageHandler = () => {
    const { history } = this.props;
    history.push('/gallery/new');
  };

  deleteImageHandler = () => {
    const { onStartDeleteImage, currentImage, currentImageIndex, user } = this.props;
    onStartDeleteImage(currentImage._id, currentImageIndex, user);
  };

  filterImages = (images, searchString) => {
    const reg = new RegExp(`^${searchString}`, 'i');
    return images.filter(image => reg.test(image.title));
  };

  render() {
    const {
      dataLoading,
      images,
      user,
      currentImage,
      lightboxIsOpen,
      currentImageIndex,
      onNextImage,
      onPrevImage
    } = this.props;
    const { searchString } = this.state;
    const photos = searchString ? this.filterImages(images, searchString) : images;
    return dataLoading ? (
      <Preloader />
    ) : (
      <section className="gallery">
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <ul className="gallery__photo-list">
            {photos.map((photo, i) => (
              <GalleryItem
                src={photo.path}
                title={photo.title}
                clicked={evt => this.openLightBoxHandler(evt, i)}
                key={photo._id}
                date={parseStringToDate(photo.date)}
              />
            ))}
          </ul>
        </Scrollbars>
        <LightBox
          src={currentImage.path}
          title={currentImage.title}
          date={parseStringToDate(currentImage.date)}
          current={currentImageIndex + 1}
          count={photos.length}
          isOpen={lightboxIsOpen}
          onNext={onNextImage}
          onPrev={onPrevImage}
          onClose={this.closeLightBoxHandler}
          onDelete={this.deleteImageHandler}
          user={user}
        />
        {user &&
          user.isAdmin && (
            <ControlPanel>
              <Button
                type="button"
                label={window.innerWidth > 1366 ? 'Add image' : '+'}
                clicked={this.addImageHandler}
              />
            </ControlPanel>
          )}
        <SearchBox value={searchString} onChange={this.searchHandler} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  dataLoading: state.load.dataLoading,
  images: state.gallery.images,
  currentImage: state.gallery.currentImage,
  currentImageIndex: state.gallery.currentImageIndex,
  lightboxIsOpen: state.gallery.lightboxIsOpen
});

const mapDispatchToProps = dispatch => ({
  onStartLoadImages: () => dispatch(Actions.startLoadImages()),
  onStartDeleteImage: (id, index, user) => dispatch(Actions.startDeleteImage(id, index, user)),
  onOpenLightBox: index => dispatch(Actions.openLightBox(index)),
  onCloseLightBox: () => dispatch(Actions.closeLightBox()),
  onNextImage: () => dispatch(Actions.nextImage()),
  onPrevImage: () => dispatch(Actions.prevImage())
});

Gallery.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  dataLoading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  currentImage: PropTypes.object,
  currentImageIndex: PropTypes.number.isRequired,
  lightboxIsOpen: PropTypes.bool.isRequired,

  onStartLoadImages: PropTypes.func.isRequired,
  onStartDeleteImage: PropTypes.func.isRequired,
  onOpenLightBox: PropTypes.func.isRequired,
  onCloseLightBox: PropTypes.func.isRequired,
  onNextImage: PropTypes.func.isRequired,
  onPrevImage: PropTypes.func.isRequired
};

Gallery.defaultProps = {
  user: null,
  images: [],
  currentImage: {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
