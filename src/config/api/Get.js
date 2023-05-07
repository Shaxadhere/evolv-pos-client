
import axios from "axios";
import { BASE_URL } from "../constants/api";

async function Get(path, token, abortController = {}, queryObj) {
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
    signal: abortController.signal
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
  }
  const { data } = await axios.get(url, header)
  return data;
}

export { Get };