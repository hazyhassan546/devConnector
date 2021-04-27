import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";

function Dashboard(props) {
  useEffect(() => {
    props.getUserProfile();
  }, []);
  return <div></div>;
}

Dashboard.propTypes = {};

export default globalConnect()(Dashboard);
