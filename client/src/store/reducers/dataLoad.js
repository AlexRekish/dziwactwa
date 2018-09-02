import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  dataLoading: false
};

const reducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  switch (action) {
    case ActionType.START_LOAD_DATA:
      newState.dataLoading = true;
      return newState;
    case ActionType.END_LOAD_DATA:
      newState.dataLoading = false;
      return newState;
    default:
      return state;
  }
};

export default reducer;
