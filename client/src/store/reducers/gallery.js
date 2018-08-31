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
  switch (action.type) {
    case ActionType.LOAD_IMAGES_SUCCEED:
      return {
        ...newState,
        images: [...action.images],
        error: null
      };
    case ActionType.LOAD_IMAGES_FAILED:
      return {
        ...newState,
        error: action.err
      };
    case ActionType.DELETE_IMAGE_SUCCEED:
      return {
        ...newState,
        images: newState.images.filter(image => image._id !== action.id),
        currentImageIndex: 0,
        error: null
      };
    case ActionType.DELETE_IMAGE_FAILED:
      return {
        ...newState,
        error: action.err
      };
    case ActionType.OPEN_LIGHTBOX:
      return {
        ...newState,
        currentImage: newState.images[action.index],
        currentImageIndex: action.index,
        lightboxIsOpen: true
      };
    case ActionType.CLOSE_LIGHTBOX:
      return {
        ...newState,
        currentImage: {},
        currentImageIndex: 0,
        lightboxIsOpen: false
      };
    case ActionType.NEXT_IMAGE:
      if (newState.currentImageIndex === newState.images.length - 1)
        return {
          ...newState,
          currentImage: newState.images[0],
          currentImageIndex: 0
        };
      return {
        ...newState,
        currentImage: newState.images[newState.currentImageIndex + 1],
        currentImageIndex: newState.currentImageIndex + 1
      };
    case ActionType.PREV_IMAGE:
      if (newState.currentImageIndex === 0)
        return {
          ...newState,
          currentImage: newState.images[newState.images.length - 1],
          currentImageIndex: newState.images.length - 1
        };
      return {
        ...newState,
        currentImage: newState.images[newState.currentImageIndex - 1],
        currentImageIndex: newState.currentImageIndex - 1
      };

    default:
      return state;
  }
};

export default reducer;
