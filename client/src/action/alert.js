import { REMOVE_ALERT, SET_ALERT } from "./types";

export const set_alert = (params) => {
  /// before return we have set a timeout to clear alerts
  return {
    type: SET_ALERT,
    payload: {
      id: params.id,
      msg: params.msg,
      alertType: params.alertType,
    },
  };
};

export const remove_alert = (id) => {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
};
