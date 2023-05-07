import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useMeetings = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["meetings", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.MEETINGS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useMeetingsFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["meetingsFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.MEETINGS.getFacet, token, {})
            return data
        },
    })
}

export const useCreateMeeting = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.MEETINGS.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.MEETINGS.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Meeting created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating meeting: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating meeting: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Meeting created successfully`)
        }
    })
}

export const useUpdateMeeting = (id) => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.MEETINGS.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.MEETINGS.base}/${id}`,
                token,
                bodyObj: body,
                showToast:true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Meeting updated successfully: ${data}`) 
        },
        onError: (error) => {
            console.log(`onError: Error while updating meeting: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating meeting: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Meeting updated successfully`)
        }
    })
}

export const useDeleteMeeting = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.MEETINGS.base}/${id}`,
                token,
                showToast:true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Meeting deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting meeting: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting meeting: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Meeting deleted successfully`)
        }
    })
}