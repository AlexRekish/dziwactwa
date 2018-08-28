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
      return {
        ...newState,
        posts: [...action.posts],
        post: {},
        error: null
      };
    case ActionType.LOAD_POSTS_FAILED:
      return {
        ...newState,
        error: action.err
      };
    case ActionType.LOAD_POST_SUCCEED:
      return {
        ...newState,
        post: action.post,
        error: null
      };
    case ActionType.LOAD_POST_FAILED:
      return {
        ...newState,
        post: {},
        error: action.err
      };
    case ActionType.DELETE_POST_SUCCEED:
      return {
        ...newState,
        post: {},
        error: null
      };
    case ActionType.DELETE_POST_FAILED:
      return {
        ...newState,
        error: action.err
      };
    default:
      return state;
  }
};

export default reducer;
