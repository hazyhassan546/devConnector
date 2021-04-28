import axios from "axios";
import { ENDPOINTS } from "../../common/routes";
import { AlertHelper } from "../../helpers/alertHelper";
import { ApiGet, ApiPost } from "../../helpers/apiHelper";
import { profileActionCreator } from "../action/profile";
import store from "../store";

export const getUserProfileApi = async () => {
  try {
    const res = await ApiGet(ENDPOINTS.profile);
    store.dispatch(profileActionCreator.getUserProfileSuccess(res.data));
  } catch (error) {
    store.dispatch(profileActionCreator.getUserProfileFailed());
  }
};

export const createOrUpdateApi = async (params, edit = false) => {
  try {
    const res = await ApiPost(ENDPOINTS.createUpdateProfile, params);
    if (res.errors) {
      res.errors.map((item) => {
        AlertHelper({ msg: item.msg, alertType: "danger" });
        console.log("any", res);
      });
      store.dispatch(profileActionCreator.createOrUpdateProfileError());
    } else {
      store.dispatch(
        profileActionCreator.createOrUpdateProfileSuccess(res.data)
      );
      AlertHelper({
        msg: edit
          ? "Profile created successfully"
          : "Profile updated successfully",
        alertType: "success",
      });
    }
  } catch (error) {
    store.dispatch(profileActionCreator.createOrUpdateProfileError());
  }
};
