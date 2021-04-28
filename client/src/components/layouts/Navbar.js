import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { globalConnect } from "../../redux/connect/globalConnect";

const Navbar = (props) => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!props.loading && (
        <Fragment>
          {props.auth.isAuthenticated ? (
            <ul>
              <li>
                <a
                  onClick={() => {
                    props.logout();
                    props.clearProfile();
                  }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="hide-sm">Logout</span>
                </a>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/">Developers</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
            </ul>
          )}
        </Fragment>
      )}
    </nav>
  );
};

export default globalConnect()(Navbar);
