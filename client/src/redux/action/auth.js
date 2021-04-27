import { createAction } from "redux-actions";
import { loadUser, registerAPI, loginApi } from "../ApiCalls/authAPi";
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  LOAD_USER,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from "./types";

export const authActionCreator = {
  registerUser: createAction(REGISTER_USER, async (payload) => {
    // this callback will be called when action is dis-patched.
    await registerAPI(payload);
  }),
  registerUserSuccess: createAction(REGISTER_USER_SUCCESS),
  registerUserFailed: createAction(REGISTER_USER_FAILED),
  //// Login User
  loadUser: createAction(LOAD_USER, async () => {
    await loadUser();
  }),
  userLoaded: createAction(USER_LOADED),
  authError: createAction(AUTH_ERROR),

  loginUser: createAction(LOGIN_USER, async (payload) => {
    // this callback will be called when action is dis-patched.
    await loginApi(payload);
  }),
  loginSuccess: createAction(LOGIN_SUCCESS),
  loginError: createAction(LOGIN_ERROR),
  
  logout: createAction(LOGOUT),
};
