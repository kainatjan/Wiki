import { LogInApi } from "../APIs/APIs";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoggedIn from "../Actions/LoginActions";
import {ConnectionHub_Action} from "../Actions/ConnectionHub";
import { useHistory } from "react-router-dom";
//signalR
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

const LogIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);

  const sessionToken = useSelector((state) => state.LoginReducer.token);
  const sessionUserId = useSelector((state) => state.LoginReducer.userId);
  const sessionUserName = useSelector((state) => state.LoginReducer.userName);
  const [login, setLogin] = useState({
    UserName: "",
    Password: "",
  });
  const [loginResponse, setLoginResponse] = useState({
    userId: "",
    userName: "",
    token: "",
  });

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    await LogInApi("/Account/Authenticate/", login)
      .then((res) => {
        if (res.status == "200") {
          let data = res.data;

          setLoginResponse({
            ...loginResponse,
            userId: data.UserId,
            userName: data.UserName,
            token: data.Token,
          });

          setIsLogin(true);
        }
      })
      .catch((error) => {
        alert(error);
        setIsLogin(false);
      });
  };

 
  useEffect(async () => {
    dispatch(LoggedIn(loginResponse));

    localStorage.setItem("sessionToken", sessionToken);
    localStorage.setItem("sessionUserId", sessionUserId);
    localStorage.setItem("sessionUserName", sessionUserName);

    if (isLogin == true) {
      // Connection
      dispatch(
        ConnectionHub_Action(
          new HubConnectionBuilder()
            .withUrl("https://localhost:44374/NotificationHub", {
              autoConnect: false,
              skipNegotiation: true,
              transport: HttpTransportType.WebSockets,
            })
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build()
        )
      );
      
     
      history.push({
        pathname: "/Home",
      });
    }
  }, [login, loginResponse, sessionToken, sessionUserId]);

  return (
    <form onSubmit={submitLoginHandler} className="">
      <div>
        <div>
          <label htmlFor="UserName">UserName</label>
          <input
            name="UserName"
            id="UserName"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => setLogin({ ...login, UserName: e.target.value })}
            value={login.UserName}
          />
        </div>
        <br />
        <div>
          <label htmlFor="Password">Pasword</label>
          <input
            name="Password"
            id="Password"
            type="password"
            autoComplete="off"
            required
            onChange={(e) => setLogin({ ...login, Password: e.target.value })}
            value={login.Password}
          />
        </div>
        <br />
        <div>
          <input type="submit" value="Login" />
        </div>
      </div>
    </form>
  );
};

export default LogIn;
