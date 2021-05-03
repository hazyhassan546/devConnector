import "./App.css";
import React, { Fragment, useEffect } from "react";
import Landing from "./components/layouts/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
/// redux
import { Provider } from "react-redux";
import Store from "../src/redux/store";
import Alerts from "./components/layouts/Alert";
import Register from "./views/auth/register";
import { authActionCreator } from "./redux/action/auth";
import setAuthToken from "./helpers/setAuthToken";
import Login from "./views/auth/login/Login";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./views/dashboard/dashboard";
import PrivateRoutes from "./helpers/navigationHelper";
import createProfile from "./views/profile/createProfile";
import EditProfile from "./views/profile/editProfile";
import AddExperience from "./views/profile/addExperience";
import AddEducation from "./views/profile/addEducation";
import profiles from "./views/profile/profiles";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  useEffect(() => {
    Store.dispatch(authActionCreator.loadUser);
  }, []);

  return (
    <Provider store={Store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alerts />
            <Switch>
              <Route exact path="/Login" component={Login} />
              <Route exact path="/Register" component={Register} />
              <Route exact path="/Profiles" component={profiles} />
              <PrivateRoutes exact path="/Dashboard" component={Dashboard} />
              <PrivateRoutes
                exact
                path="/create-profile"
                component={createProfile}
              />
              <PrivateRoutes
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoutes
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoutes
                exact
                path="/add-education"
                component={AddEducation}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
