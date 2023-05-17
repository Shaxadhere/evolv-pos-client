
import axios from "axios";
import { BASE_URL } from "../constants/api";
import { createStandaloneToast } from '@chakra-ui/toast'
import { CONTENT_TYPE } from "../constants";
const { toast } = createStandaloneToast()

async function Delete({ path, token, contentType = CONTENT_TYPE.JSON, showToast }) {
  let url = BASE_URL + path;
  try {
    const headers = { "Content-Type": contentType }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const { data } = await axios.delete(url, { headers })
    if (showToast) {
      const { message, success } = data
      if (success) {
        toast({
          title: 'Congrats!',
          description: message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
      else {
        toast({
          title: 'Oh oh!',
          description: message || "Unknown error!",
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
        description: error?.response?.data?.message || "Unknown error!",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    console.error("Error in Delete.js: ", error)
  }
}

export { Delete };