import * as ActionTypes from "../ActionTypes/ActionTypes";

const Logout_Action = () => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.loggedOut,
      payload: {
        userId: "",
        userName: "",
        token: "",
      },
    });
};
export default Logout_Action;
