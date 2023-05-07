import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Get, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";

export const useSettings = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["settings", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.SETTINGS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useUpdateSetting = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await Put({
                path: API_CONSTANTS.SETTINGS.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Setting updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating setting: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating setting: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Setting updated successfully`)
        }
    })
}