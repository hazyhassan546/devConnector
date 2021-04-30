import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_OR_UPDATE_USER_PROFILE_SUCCESS,
  CREATE_OR_UPDATE_USER_PROFILE,
  CREATE_OR_UPDATE_USER_PROFILE_ERROR,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_ERROR,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EDUCATION,
  ADD_EDUCATION_SUCCESS,
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_ERROR,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EDUCATION_ERROR,
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
    case CREATE_OR_UPDATE_USER_PROFILE:
    case ADD_EXPERIENCE:
    case ADD_EDUCATION:
    case DELETE_EDUCATION:
    case DELETE_EXPERIENCE:
    case GET_USER_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_OR_UPDATE_USER_PROFILE_SUCCESS:
    case ADD_EXPERIENCE_SUCCESS:
    case ADD_EDUCATION_SUCCESS:
    case DELETE_EDUCATION_SUCCESS:
    case DELETE_EXPERIENCE_SUCCESS:
    case GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: payload,
      };
    }
    case CREATE_OR_UPDATE_USER_PROFILE_ERROR:
    case ADD_EXPERIENCE_ERROR:
    case ADD_EXPERIENCE_ERROR:
    case DELETE_EXPERIENCE_ERROR:
      case DELETE_EDUCATION_ERROR:
    case GET_USER_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case CLEAR_PROFILE: {
      return {
        ...state,
        profile: null,
        profiles: null,
        repos: [],
        loading: false,
        error: {},
      };
    }
    default: {
      return state;
    }
  }
}
