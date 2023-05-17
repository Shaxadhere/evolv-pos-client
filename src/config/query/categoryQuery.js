import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useCategory = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["categories", params],
        queryFn: async () => {
            const { data }  = await Get({
                path: `${API_CONSTANTS.CATEGORIES.base}?${appendQueryParams(params)}`,
                token,
                toastError: true,
                toastMessage: true
            })
            return data
        },
        keepPreviousData: true
    })
}

export const useCreateCategory = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.CATEGORIES.dataKeys)
            const { data }  = await Post({
                path: API_CONSTANTS.CATEGORIES.base,
                token,
                body,
                toastError: true,
                toastMessage: true,
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Category created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating Category: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating Category: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Category created successfully`)
        }
    })
}

export const useUpdateCategory = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.CATEGORIES.dataKeys)
            const { data }  = await Put({
                path: `${API_CONSTANTS.CATEGORIES.base}/${body.id}`,
                token,
                body,
                toastError: true,
                toastMessage: true,
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Category updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating Category: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating Category: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Category updated successfully`)
        }
    })
}

export const useDeleteCategory = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data }  = await Delete({
                path: `${API_CONSTANTS.CATEGORIES.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Category deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting Category: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting Category: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Category deleted successfully`)
        }
    })
}