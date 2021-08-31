import * as ActionTypes from "../ActionTypes/ActionTypes";
const initialState={
  userId: "01",
  userName: "userName",
  token: "token",
};
function LoginReducer(state = initialState ,action) {
  
  switch (action.type) {
    case ActionTypes.loggedIn:
      return( {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        token: action.payload.token,
      });
    
    default:
      return state;
  }
}
export default LoginReducer;
