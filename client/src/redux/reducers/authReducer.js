import {
  REGISTER_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
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
    case REGISTER_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      localStorage.setItem("token", payload?.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case REGISTER_USER_FAILED: {
      localStorage.setItem("token", null);
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
