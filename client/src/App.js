import "./App.css";
import React, { Fragment, useEffect } from "react";
import { Landing } from "./components/layouts/Landing";
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
              <PrivateRoutes exact path="/Dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
