import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { globalConnect } from "../../redux/connect/globalConnect";
import { Link } from "react-router-dom";

function AddExperience(props) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    from: "",
    to: "",
    location: "",
    current: false,
    description: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.addExperience({ formData, history: props.history });
  };

  const { title, company, from, to, location, current, description } = formData;
  return (
    <Fragment>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={(e) => {
          submitForm(e);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            required
            onChange={(e) => onChange(e)}
            value={title}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            required
            onChange={(e) => onChange(e)}
            value={company}
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={(e) => onChange(e)}
            value={location}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  current: !current,
                })
              }
            />
            Current Job
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
}

AddExperience.propTypes = {};

export default globalConnect()(AddExperience);
