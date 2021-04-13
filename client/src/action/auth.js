import axios from "axios";
import { ApiPost } from "../helpers/apiHelper";
import { set_alert } from "./alert";
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  SET_ALERT,
} from "./types";

export const registerUser = (params) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER,
    });
    const response = await ApiPost("/api/users", params?.body);
    
    // if (response.data) {
    //   dispatch({
    //     type: REGISTER_USER_SUCCESS,
    //     payload: response.data,
    //   });
    // } else {
    //   dispatch({
    //     type: REGISTER_USER_FAILED,
    //   });
    // }
  } catch (error) {
    console.log(error);
    // dispatch({
    //   type: REGISTER_USER_FAILED,
    // });
  }
};
