import axios from "axios"
import { BASE_URL } from "../constants/api";
import { createStandaloneToast } from '@chakra-ui/toast'
const { toast } = createStandaloneToast()

async function Put({ path, token, body, toastError, toastMessage }) {
  let url = BASE_URL + path;
  try {

    const headers = { "Content-Type": "application/json" }
    if (token) headers.Authorization = `Bearer ${token}`

    const { data } = await axios.put(url, body, headers);

    if (toastMessage) {
      const { message } = data
      toast({
        title: 'Congrats!',
        description: message,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
    return data;
  } catch (error) {
    if (toastError) {
      toast({
        title: 'Oh oh!',
        description: error?.response?.data?.message || "Unknown error!",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    console.error("Error in Put.js: ", error)
  }
}

export { Put };