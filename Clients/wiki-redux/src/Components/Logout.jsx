import React, {useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logout_Action from "../Actions/LogoutAction";

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();


  const aftermathOfLogout = () => {
    dispatch(Logout_Action());
    history.push({
      pathname: "/LogIn",
    });
  };

  useEffect(() => {
    history.push({
      pathname: "/LogIn",
    });
    return () => {};
  }, []);

  return (
    <div>
      <button onClick={() => aftermathOfLogout}>Logout</button>
    </div>
  );
};

export default Logout;
