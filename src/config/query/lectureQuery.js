import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useLectures = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["lectures", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.LECTURES.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useLecturesFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["lecturesFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.LECTURES.getFacet, token, {})
            return data
        },
    })
}

export const useCreateLecture = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.LECTURES.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.LECTURES.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Lecture created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating lecture: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating lecture: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Lecture created successfully`)
        }
    })
}

export const useUpdateLecture = (id) => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.LECTURES.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.LECTURES.base}/${id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Lecture updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating lecture: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating lecture: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Lecture updated successfully`)
        }
    })
}

export const useDeleteLecture = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.LECTURES.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Lecture deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting lecture: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting lecture: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Lecture deleted successfully`)
        }
    })
}