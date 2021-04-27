import axios from "axios";
import { ENDPOINTS } from "../../common/routes";
import { ApiGet, ApiPost } from "../../helpers/apiHelper";
import store from "../store";

export const getUserProfileApi = async () => {
  try {
    const res = await ApiGet(ENDPOINTS.profile);
    console.log(res);
  } catch (error) {}
};
