import axios from "axios"
import { BASE_URL } from "../constants/api";

async function Put({path, token, bodyObj, queryObj, showToast}) {
  let url = BASE_URL + path;

  const header = {
    headers: token
      ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
      : {
        "Content-Type": "application/json",
      },
  };

  if (queryObj) {
    let queryString = "";
    Object.keys(queryObj).forEach((val) => {
      if (queryObj[val].length > 0) {
        if (queryString.length > 0) {
          queryString += `&${val}=${queryObj[val]}`;
        } else {
          queryString += `?${val}=${queryObj[val]}`;
        }
      }
    });

    url += queryString;
    header.headers.params = queryObj;
  }
  const { data } = await axios.put(url, bodyObj, header);
  if (showToast) {
    const { apiMessage, success } = data
    if (success) {
      // toast.success(apiMessage)
    }
    else {
      // toast.error(apiMessage)
    }
  }
  return data;
}

export { Put };