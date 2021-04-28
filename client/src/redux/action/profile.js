import { createAction } from "redux-actions";
import { createOrUpdateApi, getUserProfileApi } from "../ApiCalls/profileApi";
import {
  CLEAR_PROFILE,
  CREATE_OR_UPDATE_USER_PROFILE,
  CREATE_OR_UPDATE_USER_PROFILE_ERROR,
  CREATE_OR_UPDATE_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
} from "./types";

export const profileActionCreator = {
  getUserProfile: createAction(GET_USER_PROFILE, async (payload) => {
    // this callback will be called when action is dis-patched.
    await getUserProfileApi(payload);
  }),
  getUserProfileSuccess: createAction(GET_USER_PROFILE_SUCCESS),
  getUserProfileFailed: createAction(GET_USER_PROFILE_ERROR),
  clearProfile: createAction(CLEAR_PROFILE),

  createOrUpdateProfile: createAction(
    CREATE_OR_UPDATE_USER_PROFILE,
    async (payload) => {
      // this callback will be called when action is dis-patched.
      await createOrUpdateApi(payload);
    }
  ),
  createOrUpdateProfileSuccess: createAction(
    CREATE_OR_UPDATE_USER_PROFILE_SUCCESS
  ),
  createOrUpdateProfileError: createAction(CREATE_OR_UPDATE_USER_PROFILE_ERROR),
};
