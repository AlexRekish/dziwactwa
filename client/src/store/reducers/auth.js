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
      newState.user = action.user;
      newState.logged = !!action.user;
      return newState;
    case ActionType.LOGIN:
      newState.user = action.user;
      newState.logged = true;
      return newState;
    case ActionType.LOGOUT:
      newState.user = null;
      newState.logged = false;
      return newState;
    default:
      return state;
  }
};

export default reducer;
