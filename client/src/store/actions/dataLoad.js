export const DataAction = {
  START_LOAD_DATA: 'START_LOAD_DATA',
  END_LOAD_DATA: 'END_LOAD_DATA'
};

const getDataLoadActions = () => ({
  startLoad: () => ({ type: DataAction.START_LOAD_DATA }),
  endLoad: () => ({ type: DataAction.END_LOAD_DATA })
});

export default getDataLoadActions;
