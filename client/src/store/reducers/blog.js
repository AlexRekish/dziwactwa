import ActionType from '../actions/actions';

const initialState = {
  posts: [],
  post: {},
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_POSTS_SUCCEED:
      return {
        ...state,
        posts: [...action.posts],
        post: {},
        error: null
      };
    case ActionType.LOAD_POSTS_FAILED:
      return {
        ...state,
        error: action.err
      };
    case ActionType.LOAD_POST_SUCCEED:
      return {
        ...state,
        post: action.post,
        error: null
      };
    case ActionType.LOAD_POST_FAILED:
      return {
        ...state,
        post: {},
        error: action.err
      };
    case ActionType.DELETE_POST_SUCCEED:
      return {
        ...state,
        post: {},
        error: null
      };
    case ActionType.DELETE_POST_FAILED:
      return {
        ...state,
        error: action.err
      };
    default:
      return state;
  }
};

export default reducer;
