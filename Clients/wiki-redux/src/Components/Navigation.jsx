import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = () => {
 // const userId = localStorage.getItem("sessionUserId").toString();// == null ? "":localStorage.getItem("sessionUserId").toString();

  const userId = localStorage.getItem("sessionUserId");
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {userId ? (
          <Nav>
            <NavLink
              className="d-inline p-2 bg-dark text-white m-2 center"
              to="/Home"
            >
              Home
            </NavLink>
            <NavLink
              className="d-inline p-2 bg-dark text-white m-2 center"
              to="/Logout"
            >
              Logout
            </NavLink>
          </Nav>
        ) : (
          <Nav>
            <NavLink
              className="d-inline p-2 bg-dark text-white m-2 center"
              to="/SignUP"
            >
              SignUp
            </NavLink>
            <NavLink
              className="d-inline p-2 bg-dark text-white m-2 center"
              to="/LogIn"
            >
              Login
            </NavLink>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
