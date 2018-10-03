import ActionType from '../actions/actions';

const initialState = {
  images: [],
  currentImage: {},
  currentImageIndex: 0,
  lightboxIsOpen: false,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_IMAGES_SUCCEED:
      return {
        ...state,
        images: [...action.images],
        error: null
      };
    case ActionType.LOAD_IMAGES_FAILED:
      return {
        ...state,
        error: action.err
      };
    case ActionType.DELETE_IMAGE_SUCCEED:
      return {
        ...state,
        images: state.images.filter(image => image._id !== action.id),
        currentImageIndex: 0,
        error: null
      };
    case ActionType.DELETE_IMAGE_FAILED:
      return {
        ...state,
        error: action.err
      };
    case ActionType.OPEN_LIGHTBOX:
      return {
        ...state,
        currentImage:
          action.index >= state.images.length
            ? { ...state.images[state.images.length - 1] }
            : { ...state.images[action.index] },
        currentImageIndex:
          action.index >= state.images.length ? state.images.length - 1 : action.index,
        lightboxIsOpen: true
      };
    case ActionType.CLOSE_LIGHTBOX:
      return {
        ...state,
        currentImage: {},
        currentImageIndex: 0,
        lightboxIsOpen: false
      };
    case ActionType.NEXT_IMAGE:
      if (state.currentImageIndex === state.images.length - 1)
        return {
          ...state,
          currentImage: { ...state.images[0] },
          currentImageIndex: 0
        };
      return {
        ...state,
        currentImage: { ...state.images[state.currentImageIndex + 1] },
        currentImageIndex: state.currentImageIndex + 1
      };
    case ActionType.PREV_IMAGE:
      if (state.currentImageIndex === 0)
        return {
          ...state,
          currentImage: { ...state.images[state.images.length - 1] },
          currentImageIndex: state.images.length - 1
        };
      return {
        ...state,
        currentImage: { ...state.images[state.currentImageIndex - 1] },
        currentImageIndex: state.currentImageIndex - 1
      };

    default:
      return state;
  }
};

export default reducer;
