import _ from 'lodash';
import ActionType from '../actions/actions';

const initialState = {
  dataLoading: false
};

const reducer = (state = initialState, action) => {
  const newState = _.cloneDeep(state);
  switch (action) {
    case ActionType.START_LOAD_DATA:
      return {
        ...newState,
        dataLoading: true
      };
    case ActionType.END_LOAD_DATA:
      return {
        ...newState,
        dataLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
