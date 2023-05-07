import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useQualifications = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["qualifications", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.QUALIFICATIONS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useQualificationsFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["qualificationsFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.QUALIFICATIONS.getFacet, token, {})
            return data
        },
    })
}

export const useQualificationOptions = (params = {}) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["qualificationOptions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.QUALIFICATIONS.getOptions}?${appendQueryParams(params)}`, token, {})
            return data
        },
    })
}

export const useCreateQualification = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.QUALIFICATIONS.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.QUALIFICATIONS.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Chapter created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating chapter: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating chapter: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Chapter created successfully`)
        }
    })
}

export const useUpdateQualification = (id) => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.QUALIFICATIONS.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.QUALIFICATIONS.base}/${id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Chapter updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating chapter: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating chapter: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Chapter updated successfully`)
        }
    })
}

export const useDeleteQualification = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.QUALIFICATIONS.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Chapter deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting chapter: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting chapter: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Chapter deleted successfully`)
        }
    })
}