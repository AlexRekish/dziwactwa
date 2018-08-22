import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  user: null,
  logged: false
};

const reducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  switch (action.type) {
    case ActionType.GET_USER_FROM_LSTORAGE:
      return {
        ...newState,
        user: action.user,
        logged: !!action.user
      };
    case ActionType.LOGIN:
      return {
        ...newState,
        user: action.user,
        logged: true
      };
    case ActionType.LOGOUT:
      return {
        ...newState,
        user: null,
        logged: false
      };
    default:
      return state;
  }
};

export default reducer;
