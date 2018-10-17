import ActionType from '../actions/actions';

const initialState = {
  images: [],
  currentImage: {},
  currentImageIndex: 0,
  lightboxIsOpen: false,
  filteredImages: null,
  error: null
};

const reducer = (state = initialState, action) => {
  const images = state.filteredImages ? state.filteredImages : state.images;
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
        filteredImages: state.filteredImages
          ? images.filter(image => image._id !== action.id)
          : null,
        error: null
      };
    case ActionType.DELETE_IMAGE_FAILED:
      return {
        ...state,
        error: action.err
      };
    case ActionType.OPEN_LIGHTBOX:
      if (!images.length)
        return {
          ...state,
          currentImage: {},
          currentImageIndex: 0,
          lightboxIsOpen: false
        };
      return {
        ...state,
        currentImage:
          action.index >= images.length
            ? { ...images[images.length - 1] }
            : { ...images[action.index] },
        currentImageIndex: action.index >= images.length ? images.length - 1 : action.index,
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
      if (state.currentImageIndex === images.length - 1)
        return {
          ...state,
          currentImage: { ...images[0] },
          currentImageIndex: 0
        };
      return {
        ...state,
        currentImage: { ...images[state.currentImageIndex + 1] },
        currentImageIndex: state.currentImageIndex + 1
      };
    case ActionType.PREV_IMAGE:
      if (state.currentImageIndex === 0)
        return {
          ...state,
          currentImage: { ...images[state.images.length - 1] },
          currentImageIndex: images.length - 1
        };
      return {
        ...state,
        currentImage: { ...images[state.currentImageIndex - 1] },
        currentImageIndex: state.currentImageIndex - 1
      };
    case ActionType.FILTER_IMAGE:
      return {
        ...state,
        filteredImages: action.filteredImages
      };
    default:
      return state;
  }
};

export default reducer;
