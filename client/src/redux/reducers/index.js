import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import profile from "./profileReducers";
export default combineReducers({
  alert,
  auth,
  profile,
});
