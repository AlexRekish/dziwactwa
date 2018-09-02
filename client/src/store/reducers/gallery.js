import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  images: [],
  currentImage: {},
  currentImageIndex: 0,
  lightboxIsOpen: false,
  error: null
};

const reducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  const { images, currentImageIndex } = newState;
  switch (action.type) {
    case ActionType.LOAD_IMAGES_SUCCEED:
      newState.images = [...action.images];
      newState.error = null;
      return newState;
    case ActionType.LOAD_IMAGES_FAILED:
      newState.error = action.err;
      return newState;
    case ActionType.DELETE_IMAGE_SUCCEED:
      newState.images = images.filter(image => image._id !== action.id);
      newState.currentImageIndex = 0;
      newState.error = null;
      return newState;
    case ActionType.DELETE_IMAGE_FAILED:
      newState.error = action.err;
      return newState;
    case ActionType.OPEN_LIGHTBOX:
      newState.currentImage = images[action.index];
      newState.currentImageIndex = action.index;
      newState.lightboxIsOpen = true;
      return newState;
    case ActionType.CLOSE_LIGHTBOX:
      newState.currentImage = {};
      newState.currentImageIndex = 0;
      newState.lightboxIsOpen = false;
      return newState;
    case ActionType.NEXT_IMAGE:
      if (currentImageIndex === images.length - 1) {
        [newState.currentImage] = images;
        newState.currentImageIndex = 0;
      } else {
        newState.currentImage = images[currentImageIndex + 1];
        newState.currentImageIndex += 1;
      }
      return newState;
    case ActionType.PREV_IMAGE:
      if (currentImageIndex === 0) {
        newState.currentImage = images[images.length - 1];
        newState.currentImageIndex = images.length - 1;
      } else {
        newState.currentImage = images[currentImageIndex - 1];
        newState.currentImageIndex -= 1;
      }
      return newState;
    default:
      return state;
  }
};

export default reducer;
