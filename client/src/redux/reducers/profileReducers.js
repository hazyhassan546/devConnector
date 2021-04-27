import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
} from "../action/types";

const initialState = {
  profile: null,
  profiles: null,
  repos: [],
  loading: false,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE: {
      return {
        ...state,
        loading:true,
      };
    }
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading:false,
        profile:payload,
      };
    }
    case GET_USER_PROFILE_ERROR: {
      return {
        ...state,
        loading:false,
      };
    }
    default: {
      return state;
    }
  }
}
