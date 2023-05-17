import axios from "axios";
import { BASE_URL, TENANT } from "../constants/api";
import { CONTENT_TYPE } from "../constants";
import { createStandaloneToast } from '@chakra-ui/toast'
const { toast } = createStandaloneToast()

async function Post({ path, token, body, toastError, toastMessage, contentType = CONTENT_TYPE.JSON }) {
  try {
    let url = BASE_URL + path;
    const headers = { "Content-Type": contentType, tenant: TENANT }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const response = await axios.post(url, body, { headers });

    if (toastMessage) {
      let message = response.data.message?.message || "Unknown Error!"
      toast({
        title: 'Congrats!',
        description: message,
        status: 'success',
        duration: 9000,
        id: message,
        isClosable: true,
      })
    }
    return response.data;
  } catch (error) {
    if (toastError) {
      let message =  error?.response?.data.message?.message || "Unknown Error!"
      toast({
        title: 'Oh oh!',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } 
    console.error("Error in Post.js: ", error)
  }
}

export { Post };