import React from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../redux/connect/globalConnect";
import { Redirect, Route } from "react-router-dom";

function PrivateRoutes({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/Login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PrivateRoutes.propTypes = {};

export default globalConnect()(PrivateRoutes);
