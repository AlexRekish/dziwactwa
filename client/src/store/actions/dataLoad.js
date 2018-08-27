const getDataLoadActions = actionTypes => ({
  startLoad: () => ({ type: actionTypes.START_LOAD_DATA }),
  endLoad: () => ({ type: actionTypes.END_LOAD_DATA })
});

export default getDataLoadActions;
