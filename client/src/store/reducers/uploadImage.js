import ActionType from '../actions/actions';

const initialState = {
  selectedImage: '',
  dataURL: '',
  imageLoaded: false,
  photo: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SELECT_IMAGE:
      return {
        ...state,
        selectedImage: action.selectedImage,
        dataURL: action.dataURL,
        imageLoaded: false,
        photo: ''
      };
    case ActionType.UPLOAD_IMAGE:
      return {
        ...state,
        dataURL: action.photo,
        photo: action.photo,
        imageLoaded: true
      };
    case ActionType.CLEAR_IMAGE:
      return {
        ...initialState
      };
    case ActionType.START_EDIT_POST:
      return {
        ...state,
        photo: action.photo,
        imageLoaded: true
      };
    case ActionType.END_EDIT_POST:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
