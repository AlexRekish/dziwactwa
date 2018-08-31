export const UsersAction = {
  REGISTER: 'REGISTER'
};

const getUsersActions = () => ({
  register: (user, history) => ({ type: UsersAction.REGISTER, user, history })
});

export default getUsersActions;
