import { createAction } from "redux-actions";
import {
  getAllPostApi,
  likePostAPi,
  unlikePostApi,
  createPostApi,
  deletePostApi,
  getSinglePostApi,
  deleteCommentApi,
  addCommentApi,
} from "../ApiCalls/postApi";
import {
  GET_ALL_POST,
  GET_ALL_POST_ERROR,
  GET_ALL_POST_SUCCESS,
  LIKE_POST,
  LIKE_POST_ERROR,
  LIKE_POST_SUCCESS,
  UNLIKE_POST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_ERROR,
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  GET_SINGLE_POST,
  GET_SINGLE_POST_SUCCESS,
  GET_SINGLE_POST_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
} from "./types";

export const postActionCreator = {
  createPost: createAction(CREATE_POST, async (payload) => {
    await createPostApi(payload);
  }),
  createPostSuccess: createAction(CREATE_POST_SUCCESS),
  createPostError: createAction(CREATE_POST_ERROR),

  getAllPosts: createAction(GET_ALL_POST, async () => {
    await getAllPostApi();
  }),
  getAllPostSuccess: createAction(GET_ALL_POST_SUCCESS),
  getAllPostError: createAction(GET_ALL_POST_ERROR),

  likePost: createAction(LIKE_POST, async (payload) => {
    await likePostAPi(payload);
  }),
  likePostSuccess: createAction(LIKE_POST_SUCCESS),
  likePostError: createAction(LIKE_POST_ERROR),

  unlikePost: createAction(UNLIKE_POST, async (payload) => {
    await unlikePostApi(payload);
  }),
  unlikePostSuccess: createAction(UNLIKE_POST_SUCCESS),
  unlikePostError: createAction(UNLIKE_POST_ERROR),

  deletePost: createAction(DELETE_POST, async (payload) => {
    await deletePostApi(payload);
  }),
  deletePostSuccess: createAction(DELETE_POST_SUCCESS),
  deletePostError: createAction(DELETE_POST_ERROR),

  getSinglePost: createAction(GET_SINGLE_POST, async (payload) => {
    await getSinglePostApi(payload);
  }),
  getSinglePostSuccess: createAction(GET_SINGLE_POST_SUCCESS),
  getSinglePostError: createAction(GET_SINGLE_POST_ERROR),

  addComment: createAction(ADD_COMMENT, async (payload) => {
    await addCommentApi(payload);
  }),
  addCommentSuccess: createAction(ADD_COMMENT_SUCCESS),
  addCommentError: createAction(ADD_COMMENT_ERROR),

  deleteComment: createAction(DELETE_COMMENT, async (payload) => {
    await deleteCommentApi(payload);
  }),
  deleteCommentSuccess: createAction(DELETE_COMMENT_SUCCESS),
  deleteCommentError: createAction(DELETE_COMMENT_ERROR),
};
