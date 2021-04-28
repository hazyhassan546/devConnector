import React, { Fragment, useEffect } from "react";
import { globalConnect } from "../../redux/connect/globalConnect";
import Spinner from "../../components/layouts/spinner";
import { Link } from "react-router-dom";

function Dashboard(props) {
  useEffect(() => {
    props.getUserProfile();
  }, []);
  return props.profile.loading ? (
    <Spinner />
  ) : props.profile?.profile === null ? (
    <p className="lead">
      <i className="fas fa-user"></i> Welcome
    </p>
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {props?.auth?.user?.name}
      </p>
      <p className="my-1">
        You don't have setup your profile!
        
      </p>
      <Link className="btn btn-primary" to="/create-profile">Create Profile</Link>
    </Fragment>
  );
}

Dashboard.propTypes = {};

export default globalConnect()(Dashboard);
