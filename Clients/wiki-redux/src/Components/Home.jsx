import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import WorkspaceSidebar from "./WorkspaceSidebar";
import LogIn from "./LogIn";
import { useSelector, useDispatch } from "react-redux";
import { isConnectionHubStarted_Action } from "../Actions/ConnectionHub";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = localStorage.getItem("sessionUserId").toString();
  const connection = useSelector(
    (state) => state.ConnectionHubReducer.connection
  );

  const isConnectionStarted = useSelector(
    (state) => state.ConnectionHubReducer.isConnectionStarted
  );

  useEffect(async () => {
    if (userId !== null) {
      if (isConnectionStarted == false) {
        await connection.start();

        await connection.on("ReceiveMessage", function (message) {
          console.log("ReceiveMessage:", message);
        });
        

        await connection.invoke("AddConnectedUsers",  userId.toString());

        dispatch(isConnectionHubStarted_Action(true));
      }
    } else {
      history.push({
        pathname: "/LogIn",
      });
    }
    return () => {
      connection.onclose(() => {
        console.log("message close: ", "close"); // close logic goes here
      });
    };
  }, [userId]);

  return <div>{userId ? <WorkspaceSidebar /> : <LogIn />}</div>;
};

export default Home;

// let userId = localStorage.getItem("sessionUserId").toString();

// await connection.invoke("AddConnectedUsers", userId);
//.catch(function (err) {
//           return console.error(err.toString());
//       });

// history.push({
//   pathname: "/Home",
// });

//   useEffect(() => {
//     const newConnection = new HubConnectionBuilder().withUrl("https://localhost:44374/NotificationHub",{
//       autoConnect: false,
//     }).build();
//     setConnection(newConnection);
//     console.log("Connection setup done");
//   }, []);

//   useEffect(() => {
//     if (connection) {
//         connection.start()
//             .then(result => {
//                 connection.send("Receive Message", function (x) {
//                     console.log(x);
//                 });
//                 console.log("Event Registered");

//                 connection.send("Test", function (x) {
//                   console.log(x);
//                 });

//                 SendMessage();
//                 Hmmm();

//             })
//             .catch(e => console.log('Connection failed: ', e));
//     }
// }, [connection]);

// function SendMessage(){
//   console.log("Event Triggered");
//   if(connection != null)
//       connection.send("SendMessage").catch(function (err) {
//       return console.error(err.toString());
//   });
// }

// function Hmmm(){
//   console.log("Second Event Triggered");
//   if(connection != null)
//       connection.send("Hmmm").catch(function (err) {
//       return console.error(err.toString());
//   });
// }

// const ConnectionInitialization = async () => {
//   const ConnectingHub = new HubConnectionBuilder()
//     .withUrl("https://localhost:44374/NotificationHub/", {
//       skipNegotiation: true,
//       transport: HttpTransportType.WebSockets,
//     })
//     .configureLogging(LogLevel.Information)
//     .build();

//     ConnectingHub.onclose(() => {
//      // ConnectionInitialization();
//      console.log("message close: ", "close"); // close logic goes here
//   });
//    ConnectingHub.on("ReceiveMessage", (message) => {
//     console.log("message received: ", message);
//   });

//   setSignalRConnection(ConnectingHub);
//   return ConnectingHub;
// };

//signalR notification
// const notification = async (userId, documentId) => {
//   try {
//     if (signalRConnection) {
//         signalRConnection.start().then(() => {
//          
//         });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
