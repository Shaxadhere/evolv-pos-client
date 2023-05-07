
import axios from "axios";
import { BASE_URL } from "../constants/api";
import { toast } from "react-toastify";

async function Delete({path, token, bodyObj, queryObj, showToast}) {
  let url = BASE_URL + path;
  if (queryObj) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { queryObj },
    };
    const { data } = await axios.delete(url, bodyObj, config);
    return data;
  }
  const { data } = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: bodyObj
  })
  if (showToast) {
    const { apiMessage, success } = data
    if (success) {
      toast.success(apiMessage)
    }
    else {
      toast.error(apiMessage)
    }
  }
  return data;
}

export { Delete };