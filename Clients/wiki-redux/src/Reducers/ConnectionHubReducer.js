import * as ActionTypes from "../ActionTypes/ActionTypes";
//signalR
import {
    HubConnectionBuilder,
    LogLevel,
    HttpTransportType,
  } from "@microsoft/signalr";

const initialConnectionState ={
  connection:new HubConnectionBuilder()
  .withUrl("https://localhost:44374/NotificationHub", {
    autoConnect: false,
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets,
  })
  .configureLogging(LogLevel.Information)
  .withAutomaticReconnect()
  .build(),
  isConnectionStarted:false
};
  

function ConnectionHubReducer(state = initialConnectionState, action) {
  console.log("action",action);
  switch (action.type) {
    case ActionTypes.connectionHub:
      return (
        {
          ...state,
          connection: action.payload.connection,
        }
      )

    case ActionTypes.isConnectionHubStarted:
      return (
        {
          ...state,
          isConnectionStarted: action.payload.isConnectionStarted,
        }
      );
      

    default:
      return state;
  }
}
export default ConnectionHubReducer;
