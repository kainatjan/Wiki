import * as ActionTypes from "../ActionTypes/ActionTypes";
function NotificationReducer(state = ["0",false], action) {
  switch (action.type) {
    case ActionTypes.isNotification:
      return ({
        ...state,
        isNotification :action.payload.isNotification,
        editedDocumentId :action.payload.editedDocumentId,
      });
    default:
      return state;
  }
}
export default NotificationReducer;