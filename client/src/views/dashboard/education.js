import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

function Education(props) {
  const renderEducation = props.education.map((edu) => {
    return (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td className="hide sm">{edu.degree}</td>
        <td>
          <Moment format={"YYYY/MM/DD"}>{edu.from}</Moment> -
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format={"YYYY/MM/DD"}>{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.deleteEducation({
                edu_id: edu._id,
              });
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  return (
    <Fragment>
      <h2 className="my-2"> Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderEducation}</tbody>
      </table>
    </Fragment>
  );
}

Education.propTypes = {};

export default Education;
