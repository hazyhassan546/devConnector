import axios from "axios";
import { ENDPOINTS } from "../../common/routes";
import { AlertHelper } from "../../helpers/alertHelper";
import { ApiGet, ApiPost, ApiPut } from "../../helpers/apiHelper";
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

export const createOrUpdateApi = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.createUpdateProfile, params?.formData);
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
      params.history.push("/dashboard");
      AlertHelper({
        msg: !params?.edit
          ? "Profile created successfully"
          : "Profile updated successfully",
        alertType: "success",
      });
    }
  } catch (error) {
    store.dispatch(profileActionCreator.createOrUpdateProfileError());
  }
};

export const addExperienceApi = async (params) => {
  try {
    const res = await ApiPut(ENDPOINTS.addExperience, params?.formData);
    if (res.errors) {
      res.errors.map((item) => {
        AlertHelper({ msg: item.msg, alertType: "danger" });
        console.log("any", res);
      });
      store.dispatch(profileActionCreator.addExperienceProfileError());
    } else {
      store.dispatch(profileActionCreator.addExperienceSuccess(res.data));
      params.history.push("/dashboard");
      AlertHelper({
        msg: "Experience added successfully",
        alertType: "success",
      });
    }
  } catch (error) {
    store.dispatch(profileActionCreator.addExperienceProfileError());
  }
};

export const addEducationApi = async (params) => {
  try {
    const res = await ApiPut(ENDPOINTS.addEducation, params?.formData);
    if (res.errors) {
      res.errors.map((item) => {
        AlertHelper({ msg: item.msg, alertType: "danger" });
        console.log("any", res);
      });
      store.dispatch(profileActionCreator.addEducationError());
    } else {
      store.dispatch(profileActionCreator.addEducationSuccess(res.data));
      params.history.push("/dashboard");
      AlertHelper({
        msg: "Education added successfully",
        alertType: "success",
      });
    }
  } catch (error) {
    store.dispatch(profileActionCreator.addEducationError());
  }
};
