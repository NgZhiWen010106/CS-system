import React, { useEffect } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actionCreators/authActionCreators";
import "./customStyles.css";

const NavbarComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  return (
    <Navbar expand="lg" className="blue-gray-navbar">
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ marginLeft: "60px", marginRight: "auto" }}
      >
        QIU Community Service eCS Project Management System
      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {isLoggedIn ? (
          <>
            <Nav.Link
              as={Button}
              active
              style={{ marginRight: "5px" }}
              size="sm"
              className="blue-button"
              onClick={() => history.push("/home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Button}
              active
              style={{ marginRight: "5px" }}
              size="sm"
              className="blue-button"
              onClick={() => history.push("/dashboard")}
            >
              Assignment
            </Nav.Link>
            {user.data.name !== "Admin" && (
              <Nav.Link
                as={Button}
                active
                style={{ marginRight: "5px" }}
                size="sm"
                className="blue-button"
                onClick={() => history.push("/expensetracker")}
              >
                Expense Tracker
              </Nav.Link>
            )}
            <Nav.Link
              as={Button}
              active
              style={{ marginRight: "5px" }}
              size="sm"
              className="blue-button"
              onClick={() => history.push("/blogsite")}
            >
              Discussion Board
            </Nav.Link>
            <div
              className="welcome-text"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome,
            </div>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-white"
              to="/"
            >
              <strong>{user.data.name}</strong>
            </Nav.Link>
            <Nav.Link
              as={Button}
              active
              style={{ marginRight: "5px" }}
              size="sm"
              className="whiteborder-button"
              onClick={() => logout()}
            >
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link
              as={Button}
              onClick={() => history.push("/login")}
              active
              style={{ marginRight: "10px" }}
              size="sm"
              className="whiteborder-button"
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Button}
              onClick={() => history.push("/signup")}
              active
              style={{ marginRight: "10px" }}
              size="sm"
              className="whiteborder-button"
            >
              Register
            </Nav.Link>
            <Nav.Link
              as={Button}
              onClick={() => history.push("/admin")}
              active
              size="sm"
              className="whiteborder-button"
            >
              Admin
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
