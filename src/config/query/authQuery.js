import {
    useMutation
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Post } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";

export const useLogin = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await Post({
                path: API_CONSTANTS.AUTH.login,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: User Logged in!: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while logging in: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Mutation success: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Mutation settled created successfully`)
        }
    })
}
