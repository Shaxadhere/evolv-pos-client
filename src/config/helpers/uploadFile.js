import { Post } from "../api";
import { CONTENT_TYPE } from "../constants";
import API_CONSTANTS from "../constants/api";

const uploadFile = ({ file, isPublic = false, token, expiryMinutes = 60, maxSizeInMBs = 2, allowedExtensions = ["jpg", "jpeg", "png", "svg"], toastErrors = false }) => {
    if (!file) {
        const err = "No file provided"
        // if (toastErrors) toast.error(err)
        return Promise.reject(err)
    }

    if (file.size > maxSizeInMBs * 1024 * 1024) {
        const err = `File size cannot exceed ${maxSizeInMBs} MBs`
        // if (toastErrors) toast.error(err)
        return Promise.reject(err)
    }


    if (!allowedExtensions.includes(file.name.split(".").pop())) {
        const err = `File extension not allowed. Allowed extensions are: ${allowedExtensions.join(", ")}`
        // if (toastErrors) toast.error(err)
        return Promise.reject(err)
    }


    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("public", isPublic)
        formData.append("expiryMinutes", expiryMinutes)
        Post({
            path: API_CONSTANTS.UPLOADS.post,
            token,
            bodyObj: formData,
            contentType: CONTENT_TYPE.FORM_DATA
        })
            .then((response) => {
                if (response.success) {
                    resolve(response.data);
                }
                else {
                    console.log(`File rejected: ${response}`)
                    reject(response);
                }
            })
            .catch((error) => {
                console.log(`Error uploading file: ${error}`)
                reject(error);
            });
    });
}

//example response
// "data": {
//     "size": 105051,
//     "sizeSuffix": "102.6 KB",
//     "fileName": "[public]artt/9701d69c-8ad7-4ea1-9ece-90cf408c6310.jpeg",
//     "fileUrl": "https://elolvstoragedemo.blob.core.windows.net/public/artt/9701d69c-8ad7-4ea1-9ece-90cf408c6310.jpeg",
//     "fileUrlExpiry": null
// },
// "success": true,
// "apiMessage": "Request successfully completed!",
// "statusCode": 200

export default uploadFile;