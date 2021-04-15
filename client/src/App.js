import "./App.css";
import React, { Fragment } from "react";
import { Navbar } from "./components/layouts/Navbar";
import { Landing } from "./components/layouts/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login } from "./views/auth/login/Login";

/// redux
import { Provider } from "react-redux";
import Store from "../src/redux/store";
import Alerts from "./components/layouts/Alert";
import Register from "./views/auth/register";
function App() {
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
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
