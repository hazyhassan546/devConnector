import { connect } from "react-redux";
import { authActionCreator } from "../action/auth";
import { profileActionCreator } from "../action/profile";

function mapStateToProps({ alert, auth, profile }) {
  return {
    alert,
    auth,
    profile,
  };
}
const mapDispatchToProps = { ...authActionCreator, ...profileActionCreator };
export function globalConnect(configMapStateToProps = mapStateToProps) {
  return connect(configMapStateToProps, mapDispatchToProps);
}
