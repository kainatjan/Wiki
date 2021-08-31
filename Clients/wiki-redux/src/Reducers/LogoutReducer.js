import * as ActionTypes from "../ActionTypes/ActionTypes";

function LoginReducer(state="" ,action) {
  switch (action.type) {
    case ActionTypes.loggedOut:
      return({
        ...state,
        userId: "",
        userName: "",
        token: "",
      });
    
    default:
      return state;
  }
}
export default LoginReducer;
