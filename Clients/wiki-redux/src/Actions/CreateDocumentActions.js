import * as ActionTypes from "../ActionTypes/ActionTypes";

export const DocumentTypeId_Action = (documentTypeId) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.documentTypeId,
      payload: {
        documentTypeId: documentTypeId,
      },
    });
};
export const DocumentTitle_Action = (title) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.documentTitle,
      payload: {
        title: title,
      },
    });
};
export const DocumentText_Action = (text) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.documentText,
      payload: {
        text: text,
      },
    });
};
export const DocumentId_Action = (id) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.documentId,
      payload: {
        documentId: id,
      },
    });
};
export const ViewDocument_Action = (isTrue) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.isViewDocument,
      payload: {
        viewDocument: isTrue,
      },
    });
};
export const isSubscribedDocument_Action = (isTrue = false) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.isSubscribedDocument,
      payload: {
        isSubscribed: isTrue,
      },
    });
};
export const DocumentReset_Action = () => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.documentReset,
      payload: {
        text: "",
        title: "",
        documentTypeId: "",
        viewDocument: false,
      },
    });
};
