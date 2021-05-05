import axios from "axios";
import { ENDPOINTS } from "../../common/routes";
import { AlertHelper } from "../../helpers/alertHelper";
import { ApiGet, ApiPost, ApiPut } from "../../helpers/apiHelper";
import { postActionCreator } from "../action/post";
import { profileActionCreator } from "../action/profile";
import store from "../store";

export const getAllPostApi = async () => {
  try {
    const res = await ApiGet(ENDPOINTS.getAllPost);
    store.dispatch(postActionCreator.getAllPostSuccess(res.data));
  } catch (error) {
    store.dispatch(postActionCreator.getAllPostError());
  }
};

export const likePostAPi = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.likePost, params);
    if (res.msg) {
      AlertHelper({
        msg: res.msg,
        alertType: "danger",
      });
      store.dispatch(postActionCreator.likePostError());
    } else {
      store.dispatch(postActionCreator.likePostSuccess({ ...res, ...params }));
    }
  } catch (error) {
    store.dispatch(postActionCreator.likePostError());
  }
};

export const unlikePostApi = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.unlikePost, params);
    if (res.msg) {
      AlertHelper({
        msg: res.msg,
        alertType: "danger",
      });
      store.dispatch(postActionCreator.likePostError());
    } else {
      store.dispatch(
        postActionCreator.unlikePostSuccess({ ...res, ...params })
      );
    }
  } catch (error) {
    store.dispatch(postActionCreator.unlikePostError());
  }
};

export const createPostApi = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.createPost, params);
    store.dispatch(postActionCreator.createPostSuccess(res.data));
    AlertHelper({
      msg: "Post Created Successfully.",
      alertType: "success",
    });
  } catch (error) {
    store.dispatch(postActionCreator.createPostError());
  }
};

export const deletePostApi = async (params) => {
  try {
    const res = await ApiPost(ENDPOINTS.deletePost, params);
    store.dispatch(
      postActionCreator.deletePostSuccess({ ...res.data, ...params })
    );
    AlertHelper({
      msg: "Post Deleted Successfully.",
      alertType: "success",
    });
  } catch (error) {
    store.dispatch(postActionCreator.deletePostError());
  }
};
