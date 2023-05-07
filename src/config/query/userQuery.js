import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useUsers = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["users", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.USERS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useUsersFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["usersFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.USERS.getFacet, token, {})
            return data
        },
    })
}

export const useUserOptions = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["userOptions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.USERS.getOptions}?${appendQueryParams(params)}`, token, {})
            return data
        },
        staleTime: 1000 * 60 * 60
    })
}

export const useCreateUser = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.USERS.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.USERS.base,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: User created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating user: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating user: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: User created successfully`)
        }
    })
}

export const useUpdateUser = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.USERS.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.USERS.base}/${body.id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: User updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating user: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating user: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: User updated successfully`)
        }
    })
}

export const useDeleteUser = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.USERS.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: User deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting user: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting user: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: User deleted successfully`)
        }
    })
}