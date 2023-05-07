import axios from "axios";
import { BASE_URL } from "../constants/api";
import { CONTENT_TYPE } from "../constants";

async function Post({ path, token, bodyObj, contentType = CONTENT_TYPE.JSON, queryObj, showToast }) {
  try {
    let url = BASE_URL + path;

    const header = {
      headers: token
        ? {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
        }
        : {
          "Content-Type": contentType,
        },
    };

    if (queryObj) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { queryObj },
      };
      const response = await axios.post(url, bodyObj, config);
      return response.data
    }
    const response = await axios.post(url, bodyObj, header);
    if (showToast) {
      const { apiMessage, success } = response.data
      if (success) {
        // toast.success(apiMessage)
      }
      else {
        // toast.error(apiMessage)
      }
    }
    return response.data;
  } catch (error) {
    if (showToast) {
      // toast.error(error?.response?.data?.apiMessage || "Unknown error!")
    }
  }
}

export { Post };