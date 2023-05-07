import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Get, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";

export const useDeletedItems = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["deleted-items", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.DELETED_ITEMS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useDeleteItemsFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["deleteItemsFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.DELETED_ITEMS.getFacet, token, {})
            return data
        },
    })
}


export const useRestoreDeletedItem = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Put({
                path: `${API_CONSTANTS.DELETED_ITEMS.base}/${id}/restore`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Deleted item restored successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while restoring deleted item: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Restoring deleted item: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Deleted item restored successfully`)
        }
    })
}