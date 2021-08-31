import * as ActionTypes from "../ActionTypes/ActionTypes";

const Notification_Action = (isNotification,editedDocumentId) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.isNotification,
      payload: {
        editedDocumentId:editedDocumentId,
        isNotification: isNotification,
      },
    });
};
export default Notification_Action;
