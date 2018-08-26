import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  selectedImage: '',
  dataURL: '',
  imageLoaded: false,
  photo: ''
};

const reducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case ActionType.SELECT_IMAGE:
      return {
        ...newState,
        selectedImage: action.selectedImage,
        dataURL: action.dataURL,
        imageLoaded: false,
        photo: ''
      };
    case ActionType.UPLOAD_IMAGE:
      return {
        ...newState,
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
        ...newState,
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
