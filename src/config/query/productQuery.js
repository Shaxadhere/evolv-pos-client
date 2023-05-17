import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useProducts = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["products", params],
        queryFn: async () => {
            const { data }  = await Get({
                path: `${API_CONSTANTS.PRODUCTS.base}?${appendQueryParams(params)}`,
                token,
                toastError: true,
                toastMessage: true
            })
            return data
        },
        keepPreviousData: true
    })
}

export const useCreateProduct = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.PRODUCTS.dataKeys)
            const { data }  = await Post({
                path: API_CONSTANTS.PRODUCTS.base,
                token,
                body,
                toastError: true,
                toastMessage: true,
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Product created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating Product: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating Product: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Product created successfully`)
        }
    })
}

export const useUpdateProduct = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.PRODUCTS.dataKeys)
            const { data }  = await Put({
                path: `${API_CONSTANTS.PRODUCTS.base}/${body.id}`,
                token,
                body,
                toastError: true,
                toastMessage: true,
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Product updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating Product: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating Product: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Product updated successfully`)
        }
    })
}

export const useDeleteProduct = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data }  = await Delete({
                path: `${API_CONSTANTS.PRODUCTS.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Product deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting Product: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting Product: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Product deleted successfully`)
        }
    })
}