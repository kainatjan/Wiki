import * as ActionTypes from "../ActionTypes/ActionTypes";

export const ConnectionHub_Action = (connection) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.connectionHub,
      payload: {
        connection: connection,
      },
    });
};

export const isConnectionHubStarted_Action = (isConnectionStarted = false) => {
  return (dispatch) =>
    dispatch({
      type: ActionTypes.isConnectionHubStarted,
      payload: {
        isConnectionStarted: isConnectionStarted,
      },
    });
};
