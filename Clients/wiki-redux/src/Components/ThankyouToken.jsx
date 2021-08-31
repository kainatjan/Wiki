import React from "react";
import LogIn from "./LogIn"

const ThankyouToken = () => {
  return (
    <form>
    <div className="form-inner">
    <div className="form-group">
    <h4 style={ {color: 'coral'} }>
       Thank you for Signing Up
       </h4>
       </div>
      <div className="form-group">
      <LogIn/>
      </div>
    </div>
  </form>
  );
};

export default ThankyouToken;
