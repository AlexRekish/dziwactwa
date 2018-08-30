import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchBox from '../../common/SearchBox/SearchBox';
import ControlPanel from '../../common/ControlPanel/ControlPanel';
import Button from '../../common/Button/Button';
import LightBox from './LightBox/LightBox';
import GalleryItem from './GalleryItem/GalleryItem';
import Preloader from '../../common/Preloader/Preloader';
import { Actions } from '../../store/actions/actions';
import parseStringToDate from '../../utils/date';
import './Gallery.sass';

class Gallery extends Component {
  state = {
    currentImage: {},
    currentImageIndex: 0,
    lightboxIsOpen: false,
    searchString: ''
  };

  componentDidMount() {
    const { onStartLoadImages } = this.props;
    onStartLoadImages();
  }

  openLightboxHandler = index => {
    const { images } = this.props;
    this.setState({
      currentImage: images[index],
      currentImageIndex: index,
      lightboxIsOpen: true
    });
  };

  closeLightboxHandler = () => {
    this.setState({
      currentImage: {},
      currentImageIndex: 0,
      lightboxIsOpen: false
    });
  };

  gotoPreviousHandler = () => {
    const { images } = this.props;
    this.setState(prevState => {
      if (prevState.currentImageIndex === 0)
        return {
          currentImage: images[images.length - 1],
          currentImageIndex: images.length - 1
        };
      return {
        currentImage: images[prevState.currentImageIndex - 1],
        currentImageIndex: prevState.currentImageIndex - 1
      };
    });
  };

  gotoNextHandler = () => {
    const { images } = this.props;
    this.setState(prevState => {
      if (prevState.currentImageIndex === images.length - 1)
        return {
          currentImage: images[0],
          currentImageIndex: 0
        };
      return {
        currentImage: images[prevState.currentImageIndex + 1],
        currentImageIndex: prevState.currentImageIndex + 1
      };
    });
  };

  searchHandler = string => {
    this.setState({ searchString: string });
  };

  addImageHandler = () => {
    const { history } = this.props;
    history.push('/gallery/new');
  };

  deleteImageHandler = () => {
    const { onStartDeleteImage } = this.props;
    const { currentImage } = this.state;
    onStartDeleteImage(currentImage._id);
    this.gotoNextHandler();
  };

  filterImages = (images, searchString) => {
    const reg = new RegExp(`^${searchString}`, 'i');
    return images.filter(image => reg.test(image.title));
  };

  render() {
    const { dataLoading, images, user } = this.props;
    const { currentImage, lightboxIsOpen, currentImageIndex, searchString } = this.state;
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
                clicked={() => this.openLightboxHandler(i)}
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
          onNext={this.gotoNextHandler}
          onPrev={this.gotoPreviousHandler}
          onClose={this.closeLightboxHandler}
          onDelete={this.deleteImageHandler}
          user={user}
        />
        <ControlPanel>
          {user &&
            user.isAdmin && (
              <Button type="button" label="Add image" clicked={this.addImageHandler} />
            )}
        </ControlPanel>
        <SearchBox value={searchString} onChange={this.searchHandler} />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  dataLoading: state.load.dataLoading,
  images: state.gallery.images,
  image: state.gallery.image
});

const mapDispatchToProps = dispatch => ({
  onStartLoadImages: () => dispatch(Actions.startLoadImages()),
  onStartDeleteImage: id => dispatch(Actions.startDeleteImage(id))
});

Gallery.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  dataLoading: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
  onStartLoadImages: PropTypes.func.isRequired,
  onStartDeleteImage: PropTypes.func.isRequired
};

Gallery.defaultProps = {
  user: null,
  images: []
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
