import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";
import Moment from "react-moment";

const PostDetails = (props) => {
  useEffect(() => {
    props.getAllPosts();
  }, []);
  return <Fragment></Fragment>;
};

PostDetails.propTypes = {};

export default globalConnect()(PostDetails);
