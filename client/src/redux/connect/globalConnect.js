import { connect } from "react-redux";
import { authActionCreator } from "../action/auth";

function mapStateToProps({ alert, auth }) {
  return {
    alert,
    auth,
  };
}
const mapDispatchToProps = { ...authActionCreator };
export function globalConnect(configMapStateToProps = mapStateToProps) {
  return connect(configMapStateToProps, mapDispatchToProps);
}
