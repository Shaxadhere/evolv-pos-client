
import axios from "axios";
import { BASE_URL } from "../constants/api";
import { createStandaloneToast } from '@chakra-ui/toast'
const { toast } = createStandaloneToast()

async function Delete({ path, token, body, queryObj, showToast }) {
  let url = BASE_URL + path;
  try {
    if (queryObj) {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { queryObj },
      };
      const { data } = await axios.delete(url, body, config);
      return data;
    }
    const { data } = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: body
    })
    if (showToast) {
      const { apiMessage, success } = data
      if (success) {
        toast({
          title: 'Congrats!',
          description: apiMessage,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: 'Oh oh!',
          description: apiMessage || "Unknown error!",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
    return data;
  } catch (error) {
    if (showToast) {
      toast({
        title: 'Oh oh!',
        description: error?.response?.data?.apiMessage || "Unknown error!",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    console.error("Error in Delete.js: ", error)
  }
}

export { Delete };