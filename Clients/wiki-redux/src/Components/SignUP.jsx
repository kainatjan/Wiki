import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { SignUpApi } from "../APIs/APIs";

const SignUP = () => {
  let history = useHistory;
  const [signUpData, setSignUp] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    UserName: "",
    Password: "",
  });
  const submitSignUpHandler = (e) => {
    e.preventDefault();
    SignUpApi("/SignUp/", signUpData)
      .then((result) => {
        history.push({
          pathname: '/ThankyouToken',
          state: {
            response: "" 
          } 
       });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={submitSignUpHandler}>
      <div className="form-inner">
        <div className="form-group">
          <label htmlFor="FirstName">First Name</label>
          <input
            name="FirstName"
            id="FirstName"
            type="text"
            autoComplete="off"
            required
            onChange={(e) =>
              setSignUp({ ...signUpData, FirstName: e.target.value })
            }
            value={signUpData.FirstName}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="LastName">Last Name</label>
          <input
            name="LastName"
            id="LastName"
            type="text"
            autoComplete="off"
            required
            onChange={(e) =>
              setSignUp({ ...signUpData, LastName: e.target.value })
            }
            value={signUpData.LastName}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="Email">Email</label>
          <input
            name="Email"
            id="Email"
            type="email"
            autoComplete="off"
            required
            onChange={(e) =>
              setSignUp({ ...signUpData, Email: e.target.value })
            }
            value={signUpData.Email}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="UserName">UserName</label>
          <input
            name="UserName"
            id="UserName"
            type="text"
            autoComplete="off"
            required
            onChange={(e) =>
              setSignUp({ ...signUpData, UserName: e.target.value })
            }
            value={signUpData.UserName}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="Password">Pasword</label>
          <input
            name="Password"
            id="Password"
            type="password"
            autoComplete="off"
            required
            onChange={(e) =>
              setSignUp({ ...signUpData, Password: e.target.value })
            }
            value={signUpData.Password}
          />
        </div>
        <br />
        <div className="form-group">
          <input type="submit" value="Sign up" />
        </div>
      </div>
    </form>
  );
};

export default SignUP;
