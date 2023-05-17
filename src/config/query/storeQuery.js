import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useStores = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["stores", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.STORES.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useCreateStore = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.STORES.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.STORES.base,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Store created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating Store: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating Store: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Store created successfully`)
        }
    })
}

export const useUpdateStore = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.STORES.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.STORES.base}/${body.id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Store updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating Store: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating Store: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Store updated successfully`)
        }
    })
}

export const useDeleteStore = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.STORES.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Store deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting Store: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting Store: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Store deleted successfully`)
        }
    })
}