const getUsersActions = actionTypes => ({
  register: (user, history) => ({ type: actionTypes.REGISTER, user, history })
});

export default getUsersActions;
