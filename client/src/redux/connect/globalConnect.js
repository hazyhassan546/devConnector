import { connect } from "react-redux";
import { authActionCreator } from "../action/auth";
import { profileActionCreator } from "../action/profile";
import { postActionCreator } from "../action/post";

function mapStateToProps({ alert, auth, profile, post }) {
  return {
    alert,
    auth,
    profile,
    post,
  };
}
const mapDispatchToProps = {
  ...authActionCreator,
  ...profileActionCreator,
  ...postActionCreator,
};
export function globalConnect(configMapStateToProps = mapStateToProps) {
  return connect(configMapStateToProps, mapDispatchToProps);
}
