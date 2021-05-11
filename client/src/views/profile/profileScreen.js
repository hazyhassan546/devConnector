import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/layouts/spinner";
import { globalConnect } from "../../redux/connect/globalConnect";
import About from "./profileComponents/about";
import Education from "./profileComponents/education";
import Experience from "./profileComponents/experience";
import GithubRepo from "./profileComponents/githubRepos";
import ProfileTop from "./profileComponents/profileTop";

const ProfileScreen = (props) => {
  useEffect(() => {
    props.getUserProfileById({ userId: props.match.params.id });
  }, []);
  return (
    <Fragment>
      {props.profile.loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          <Link to="/profiles" class="btn btn-light">
            Go back to profiles
          </Link>
          {props.auth.isAuthenticated &&
            props.profile.loading == false &&
            props.auth.user._id === props.match.params.id && (
              <Link to="/edit-profile" class="btn btn-light">
                <i class="fas fa-user-circle text-primary"></i> Edit Profile
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop {...props} />
            <About {...props} />
          </div>
          <Experience {...props} />
          <Education {...props} />
          {props?.profile?.profile?.githubUserName && <GithubRepo {...props} />}
        </Fragment>
      )}
    </Fragment>
  );
};

export default globalConnect()(ProfileScreen);
