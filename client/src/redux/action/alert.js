import { REMOVE_ALERT, SET_ALERT } from "./types";
function setAlert(params) {
  return {
    type: SET_ALERT,
    payload: params,
  };
}
function removeAlert(params) {
  return {
    type: REMOVE_ALERT,
    payload: params,
  };
}
export { setAlert, removeAlert };
