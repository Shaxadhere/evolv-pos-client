import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const usePermissions = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["permissions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.PERMISSIONS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const usePermissionsFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["permissionsFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.PERMISSIONS.getFacet, token, {})
            return data
        },
    })
}

export const useCreatePermission = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.PERMISSIONS.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.PERMISSIONS.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Permission created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating permission: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating permission: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Permission created successfully`)
        }
    })
}

export const useUpdatePermission = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.PERMISSIONS.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.PERMISSIONS.base}/${body.id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Permission updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating permission: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating permission: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Permission updated successfully`)
        }
    })
}

export const useDeletePermission = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.PERMISSIONS.base}/${id}`,
                token,
                showToast:true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Permission deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting permission: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting permission: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Permission deleted successfully`)
        }
    })
}