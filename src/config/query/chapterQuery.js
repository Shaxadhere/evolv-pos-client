import {
    useQuery,
    useMutation
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useChapters = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["chapters", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.CHAPTERS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useChaptersFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["chaptersFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.CHAPTERS.getFacet, token, {})
            return data
        },
    })
}

export const useChapterOptions = (params = {}) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["chapterOptions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.CHAPTERS.getOptions}?${appendQueryParams(params)}`, token, {})
            return data
        },
        staleTime: 1000 * 60 * 60
    })
}

export const useCreateChapter = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.CHAPTERS.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.CHAPTERS.base,
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

export const useUpdateChapter = (id) => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.CHAPTERS.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.CHAPTERS.base}/${id}`,
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


export const useDeleteChapter = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.CHAPTERS.base}/${id}`,
                token,
                showToast:true
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