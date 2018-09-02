import ActionType from '../actions/actions';

const initialState = {
  dataLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action) {
    case ActionType.START_LOAD_DATA:
      return {
        ...state,
        dataLoading: true
      };
    case ActionType.END_LOAD_DATA:
      return {
        ...state,
        dataLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
