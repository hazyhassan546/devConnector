import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";
import Spinner from "../../components/layouts/spinner";
import ProfileItem from "./profileItem";
function Profiles(props) {
  useEffect(() => {
    props.getAllUserProfiles();
  }, []);
  return props?.profile?.loading ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <h1 className={"large text-primary"}>Developers</h1>
      <p className={"lead"}>
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        Developers
      </p>
      <div className="profiles">
        {props?.profile?.profiles?.length > 0 ? (
          props?.profile?.profiles?.map((item) => {
            return <ProfileItem key={item?._id} profile={item} />;
          })
        ) : (
          <h4>No Profiles found</h4>
        )}
      </div>
    </Fragment>
  );
}

Profiles.propTypes = {};

export default globalConnect()(Profiles);
