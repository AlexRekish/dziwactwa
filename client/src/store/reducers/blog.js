import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  posts: [],
  post: {},
  error: null
};

const reducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case ActionType.LOAD_POSTS_SUCCEED:
      newState.posts = [...action.posts];
      newState.post = {};
      newState.error = null;
      return newState;
    case ActionType.LOAD_POSTS_FAILED:
      newState.error = action.err;
      return newState;
    case ActionType.LOAD_POST_SUCCEED:
      newState.post = action.post;
      newState.error = null;
      return newState;
    case ActionType.LOAD_POST_FAILED:
      newState.post = {};
      newState.error = action.err;
      return newState;
    case ActionType.DELETE_POST_SUCCEED:
      newState.post = {};
      newState.error = null;
      return newState;
    case ActionType.DELETE_POST_FAILED:
      newState.error = action.err;
      return newState;
    default:
      return state;
  }
};

export default reducer;
