import * as ActionTypes from "../ActionTypes/ActionTypes";

export default function CreateDocumentReducer(state = [], action) {

  switch (action.type) {
    case ActionTypes.documentTypeId:
      return {
        ...state,
        documentTypeId: action.payload.documentTypeId,
      };

    case ActionTypes.documentTitle:
      return {
        ...state,
        title: action.payload.title,
      };

    case ActionTypes.documentText:
      return {
        ...state,
        text: action.payload.text,
      };
    case ActionTypes.documentId:
      return {
        ...state,
        documentId: action.payload.documentId,
      };
    case ActionTypes.isViewDocument:
      return {
        ...state,
        viewDocument: action.payload.viewDocument,
      };
      
      case ActionTypes.isSubscribedDocument:
      return {
        ...state,
        isSubscribed: action.payload.isSubscribed,
      };
    case ActionTypes.documentReset:
      return {
        ...state,
        text: action.payload.text,
        title: action.payload.title,
        documentTypeId: action.payload.documentTypeId,
        viewDocument: action.payload.viewDocument,
        isSubscribed: action.payload.isSubscribed,
      };
    default:
      return state;
  }
}
