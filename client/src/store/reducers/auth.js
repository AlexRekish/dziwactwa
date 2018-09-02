import ActionType from '../actions/actions';

const initialState = {
  user: null,
  logged: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_USER_FROM_LSTORAGE:
      return {
        ...state,
        user: action.user,
        logged: !!action.user
      };
    case ActionType.LOGIN:
      return {
        ...state,
        user: action.user,
        logged: true
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        user: null,
        logged: false
      };
    default:
      return state;
  }
};

export default reducer;
