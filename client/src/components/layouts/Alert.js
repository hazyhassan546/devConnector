// import React from "react";
import React, { Component } from "react";
import { connect } from "react-redux";
class Alerts extends Component {
  render() {
    const { alerts } = this.props;
    return alerts.length > 0
      ? alerts.map((item, index) => {
          return (
            <div key={item?.id} className={"alert alert-" + item?.alertType}>
              {item?.msg}
            </div>
          );
        })
      : null;
  }
}

function mapStateToProps(state) {
  return {
    alerts: state?.alert,
  };
}

export default connect(mapStateToProps, null)(Alerts);
