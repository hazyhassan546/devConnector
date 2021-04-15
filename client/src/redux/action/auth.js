import { createAction } from "redux-actions";
import { registerAPI } from "../ApiCalls/authAPi";
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
} from "./types";

export const authActionCreator = {
  registerUser: createAction(REGISTER_USER, async (payload) => {
    // this callback will be called when action is dis-patched.
    await registerAPI(payload);
  }),
  registerUserSuccess: createAction(REGISTER_USER_SUCCESS),
  registerUserFailed: createAction(REGISTER_USER_FAILED),
};
