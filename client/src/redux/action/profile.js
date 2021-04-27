import { createAction } from "redux-actions";
import { getUserProfileApi } from "../ApiCalls/profileApi";
import { GET_USER_PROFILE, GET_USER_PROFILE_ERROR, GET_USER_PROFILE_SUCCESS } from "./types";

export const profileActionCreator = {
  getUserProfile: createAction(GET_USER_PROFILE, async (payload) => {
    // this callback will be called when action is dis-patched.
    await getUserProfileApi(payload);
  }),
  getUserProfileSuccess: createAction(GET_USER_PROFILE_SUCCESS),
  getUserProfileFailed: createAction(GET_USER_PROFILE_ERROR),
};
