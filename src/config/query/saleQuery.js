import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useSales = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["sales", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.SALES.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useCreateSale = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.SALES.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.SALES.base,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Sale created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating Sale: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating Sale: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Sale created successfully`)
        }
    })
}

export const useUpdateSale = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.SALES.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.SALES.base}/${body.id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Sale updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating Sale: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating Sale: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Sale updated successfully`)
        }
    })
}

export const useDeleteSale = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.SALES.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Sale deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting Sale: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting Sale: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Sale deleted successfully`)
        }
    })
}