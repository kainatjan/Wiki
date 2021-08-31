import * as ActionTypes from "../ActionTypes/ActionTypes";

const LoggedIn = (loginResponse) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.loggedIn,
      payload: {
        userId: loginResponse.userId,
        userName: loginResponse.userName,
        token: loginResponse.token,
      },
    });
};
export default LoggedIn;
