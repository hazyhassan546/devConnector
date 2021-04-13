import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { set_alert, remove_alert } from "../../action/alert";
import { AlertHelper } from "../../helpers/alertHelper";
import { registerUser } from "../../action/auth";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      // this function will add and remove alerts as per requirements
      AlertHelper("Password do not matched", "danger", 2000, props);
    } else {
      const User = {
        name,
        email,
        password,
      };
      try {
        props.registerUser({
          body: User,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => submitForm(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            name="email"
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching actions returned by action creators
    set_alert: (params) => dispatch(set_alert(params)),
    remove_alert: (params) => dispatch(remove_alert(params)),
    registerUser: (params) => dispatch(registerUser(params)),
  };
};
export default connect(null, mapDispatchToProps)(Register);
