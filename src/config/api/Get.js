
import axios from "axios";
import { BASE_URL, TENANT } from "../constants/api";
import { createStandaloneToast } from '@chakra-ui/toast'
import { CONTENT_TYPE } from "../constants";
const { toast } = createStandaloneToast()

async function Get({ path, token, toastMessage, toastError, contentType = CONTENT_TYPE.JSON }) {
  try {
    let url = BASE_URL + path;
    const headers = { "Content-Type": contentType, tenant: TENANT }
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const response = await axios.get(url, { headers });
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
      let message = error?.response?.data.message?.message || "Unknown Error!"
      toast({
        title: 'Oh oh!',
        description: message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    console.error("Error in Get.js: ", error)
  }
}

export { Get };