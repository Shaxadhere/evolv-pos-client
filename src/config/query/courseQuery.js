import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import { prepareData } from "../helpers/apiHelper"
import API_CONSTANTS from "../constants/api";

export const useCourses = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["courses", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.COURSES.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useCoursesFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["coursesFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.COURSES.getFacet, token, {})
            return data
        },
    })
}

export const useCourseOptions = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["courseOptions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.COURSES.getOptions}?${appendQueryParams(params)}`, token, {})
            return data
        },
    })
}

export const useCreateCourse = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body,  API_CONSTANTS.COURSES.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.COURSES.base,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Course created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating course: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating course: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Course created successfully`)
        }
    })
}

export const useUpdateCourse = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.COURSES.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.COURSES.base}/${body.id}`,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Course updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating course: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating course: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Course updated successfully`)
        }
    })
}

export const useDeleteCourse = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.COURSES.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Course deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting course: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting course: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Course deleted successfully`)
        }
    })
}