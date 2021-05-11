import {
  AUTH_ERROR,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_SUCCESS,
  LOAD_USER,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_USER,
  LOGOUT,
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  USER_LOADED,
} from "../action/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: false,
  user: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
    case LOGIN_USER:
    case DELETE_ACCOUNT:
    case REGISTER_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOADED: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload?.user,
      };
    }
    case REGISTER_USER_SUCCESS:
    case LOGIN_SUCCESS: {
      localStorage.setItem("token", payload?.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case AUTH_ERROR:
    case LOGIN_ERROR:
    case LOGOUT:
    case DELETE_ACCOUNT_SUCCESS:
    case REGISTER_USER_FAILED: {
      localStorage.setItem("token", null);
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    }
    case DELETE_ACCOUNT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
