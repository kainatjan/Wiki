import LoginReducer from "./LoginReducer";
import CreateDocumentReducer from "./CreateDocumentReducers";
import LogoutReducer from "./LogoutReducer";
import NotificationReducer from "./NotificationReducer";
import ConnectionHubReducer from "./ConnectionHubReducer";
import { combineReducers } from "redux";


const  AllReducers = combineReducers({
    LoginReducer,
    CreateDocumentReducer,
    LogoutReducer,
    NotificationReducer,
    ConnectionHubReducer
});
export default AllReducers;