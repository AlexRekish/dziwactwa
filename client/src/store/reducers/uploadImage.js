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
      newState.selectedImage = action.selectedImage;
      newState.dataURL = action.dataURL;
      newState.imageLoaded = false;
      newState.photo = '';
      return newState;
    case ActionType.UPLOAD_IMAGE:
      newState.photo = action.photo;
      newState.dataURL = action.photo;
      newState.imageLoaded = true;
      return newState;
    case ActionType.CLEAR_IMAGE:
      return {
        ...initialState
      };
    case ActionType.START_EDIT_POST:
      newState.photo = action.photo;
      newState.imageLoaded = true;
      return newState;
    case ActionType.END_EDIT_POST:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default reducer;
