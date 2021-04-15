import { ENDPOINTS } from "../../common/routes";
import { AlertHelper } from "../../helpers/alertHelper";
import { ApiPost } from "../../helpers/apiHelper";
import { setAlert } from "../action/alert";
import { authActionCreator } from "../action/auth";
import store from "../store";

export const registerAPI = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.register, params.body);
    if (!res.errors) {
      AlertHelper({ msg: "User Registered Successfully", alertType: "success" });
      store.dispatch(authActionCreator.registerUserSuccess(res.data));
    } else {
      store.dispatch(authActionCreator.registerUserFailed());
      res.errors.map((item) => {
        AlertHelper({ msg: item.msg, alertType: "danger" });
        console.log("any", res);
      });
    }
  } catch (error) {}
};
