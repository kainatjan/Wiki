import React from "react";
import SignUP from "./Components/SignUP";
import LogIn from "./Components/LogIn";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import CreateDocument from "./Components/CreateDocument";
import EditDocument from "./Components/EditDocument";
import WorkspaceSidebar from "./Components/WorkspaceSidebar";
import ThankyouToken from "./Components/ThankyouToken";
import Navigation from "./Components/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// export const documentTypeIdContext = React.createContext();

function App() {
  const UserName = localStorage.getItem("sessionUserName");

  

  // localStorage.clear();
  return (
    <BrowserRouter>
      <div className="container">
        <h3 className="mt-5 d-flex justify-content-right">
          <b>WIKI {UserName}</b>
        </h3>

        <Navigation />

        <Switch>
          <Route path="/" component={LogIn} exact />
          <Route path="/Home" component={Home} exact />
          <Route path="/SignUP" component={SignUP} exact />
          <Route path="/LogIn" component={LogIn} exact />
          <Route path="/WorkspaceSidebar" component={WorkspaceSidebar} exact />
          <Route path="/ThankyouToken" component={ThankyouToken} exact />
          <Route path="/CreateDocument" component={CreateDocument} exact />
          <Route path="/Logout" component={Logout} exact />
          <Route path="/EditDocument" component={EditDocument} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
