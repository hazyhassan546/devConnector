import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import profile from "./profileReducers";
import post from "./postReducer";
export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
