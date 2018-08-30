import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  images: [],
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
        error: null
      };
    case ActionType.DELETE_IMAGE_FAILED:
      return {
        ...newState,
        error: action.err
      };
    default:
      return state;
  }
};

export default reducer;
