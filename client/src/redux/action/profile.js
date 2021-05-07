import { createAction } from "redux-actions";
import {
  createOrUpdateApi,
  getUserProfileApi,
  addExperienceApi,
  addEducationApi,
  deleteEducationAPi,
  deleteExperienceApi,
  getAllProfilesApi,
  getGithubRepoApi,
  getUserProfileByIDApi,
  uploadingImageApi,
} from "../ApiCalls/profileApi";
import {
  ADD_EDUCATION,
  ADD_EDUCATION_ERROR,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_ERROR,
  ADD_EXPERIENCE_SUCCESS,
  CLEAR_PROFILE,
  CREATE_OR_UPDATE_USER_PROFILE,
  CREATE_OR_UPDATE_USER_PROFILE_ERROR,
  CREATE_OR_UPDATE_USER_PROFILE_SUCCESS,
  DELETE_EDUCATION,
  DELETE_EDUCATION_ERROR,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_ERROR,
  DELETE_EXPERIENCE_SUCCESS,
  GET_ALL_USER_PROFILE,
  GET_ALL_USER_PROFILE_ERROR,
  GET_ALL_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_BY_ID,
  GET_USER_PROFILE_BY_ID_SUCCESS,
  GET_USER_PROFILE_BY_ID_ERROR,
  GET_GITHUB_REPO,
  GET_GITHUB_REPO_SUCCESS,
  GET_GITHUB_REPO_ERROR,
  PROFILE_IMAGE,
  PROFILE_IMAGE_SUCCESS,
  PROFILE_IMAGE_ERROR,
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

  addExperience: createAction(ADD_EXPERIENCE, async (payload) => {
    // this callback will be called when action is dis-patched.
    await addExperienceApi(payload);
  }),
  addExperienceSuccess: createAction(ADD_EXPERIENCE_SUCCESS),
  addExperienceProfileError: createAction(ADD_EXPERIENCE_ERROR),

  addEducation: createAction(ADD_EDUCATION, async (payload) => {
    // this callback will be called when action is dis-patched.
    await addEducationApi(payload);
  }),
  addEducationSuccess: createAction(ADD_EDUCATION_SUCCESS),
  addEducationError: createAction(ADD_EDUCATION_ERROR),

  deleteEducation: createAction(DELETE_EDUCATION, async (payload) => {
    await deleteEducationAPi(payload);
  }),
  deleteEducationSuccess: createAction(DELETE_EDUCATION_SUCCESS),
  deleteEducationError: createAction(DELETE_EDUCATION_ERROR),

  deleteExperience: createAction(DELETE_EXPERIENCE, async (payload) => {
    await deleteExperienceApi(payload);
  }),
  deleteExperienceSuccess: createAction(DELETE_EXPERIENCE_SUCCESS),
  deleteExperienceError: createAction(DELETE_EXPERIENCE_ERROR),

  getAllUserProfiles: createAction(GET_ALL_USER_PROFILE, async () => {
    await getAllProfilesApi();
  }),
  getAllUserProfilesSuccess: createAction(GET_ALL_USER_PROFILE_SUCCESS),
  getAllUserProfileError: createAction(GET_ALL_USER_PROFILE_ERROR),

  getUserProfileById: createAction(GET_USER_PROFILE_BY_ID, async (payload) => {
    await getUserProfileByIDApi(payload);
  }),
  getUserProfileByIdSuccess: createAction(GET_USER_PROFILE_BY_ID_SUCCESS),
  getUserProfileByIdError: createAction(GET_USER_PROFILE_BY_ID_ERROR),

  getGithubRepo: createAction(GET_GITHUB_REPO, async (payload) => {
    await getGithubRepoApi(payload);
  }),
  getGithubRepoSuccess: createAction(GET_GITHUB_REPO_SUCCESS),
  getGithubRepoError: createAction(GET_GITHUB_REPO_ERROR),

  uploadProfileImage: createAction(PROFILE_IMAGE, async (payload) => {
    await uploadingImageApi(payload);
  }),
  uploadProfileImageSuccess: createAction(PROFILE_IMAGE_SUCCESS),
  uploadProfileImageError: createAction(PROFILE_IMAGE_ERROR),
};
