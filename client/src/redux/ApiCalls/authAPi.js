import axios from "axios";
import { ENDPOINTS } from "../../common/routes";
import { AlertHelper } from "../../helpers/alertHelper";
import { ApiDelete, ApiPost } from "../../helpers/apiHelper";
import setAuthToken from "../../helpers/setAuthToken";
import { setAlert } from "../action/alert";
import { authActionCreator } from "../action/auth";
import store from "../store";

export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("api/auth");
    store.dispatch(authActionCreator.userLoaded(res.data));
  } catch (error) {
    store.dispatch(authActionCreator.authError());
  }
};

export const registerAPI = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.register, params.body);
    if (!res.errors) {
      AlertHelper({
        msg: "User Registered Successfully",
        alertType: "success",
      });
      store.dispatch(authActionCreator.registerUserSuccess(res.data));
      store.dispatch(authActionCreator.loadUser());
    } else {
      store.dispatch(authActionCreator.registerUserFailed());
      res.errors.map((item) => {
        AlertHelper({ msg: item.msg, alertType: "danger" });
        console.log("any", res);
      });
    }
  } catch (error) {}
};

export const loginApi = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.login, params);
    if (res.data) {
      AlertHelper({
        msg: "User Login Successfully",
        alertType: "success",
      });
      store.dispatch(authActionCreator.loginSuccess(res.data));
      store.dispatch(authActionCreator.loadUser());
    } else {
      store.dispatch(authActionCreator.loginError());
      res.errors.map((item) => {
        AlertHelper({ msg: item.msg, alertType: "danger" });
        console.log("any", res);
      });
    }
  } catch (error) {
    store.dispatch(authActionCreator.loginError());
  }
};

export const deleteAccountApi = async () => {
  try {
    const res = await ApiDelete(ENDPOINTS.deleteProfile);
    store.dispatch(authActionCreator.deleteAccountSuccess());
  } catch (error) {
    store.dispatch(authActionCreator.deleteAccountError());
  }
};
