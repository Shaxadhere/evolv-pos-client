import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useRoles = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["roles", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.ROLES.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useRolesFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["rolesFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.ROLES.getFacet, token, {})
            return data
        },
    })
}

export const useRolesOptions = (params = {}) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["rolesOptions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.ROLES.getOptions}?${appendQueryParams(params)}`, token, {})
            return data
        },
        staleTime: 1000 * 60 * 60
    })
}

export const useCreateRole = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.ROLES.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.ROLES.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Role created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating role: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating role: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Role created successfully`)
        }
    })
}

export const useUpdateRole = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.ROLES.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.ROLES.base}/${body.id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Role updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating role: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating role: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Role updated successfully`)
        }
    })
}

export const useDeleteRole = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.ROLES.base}/${id}`,
                token,
                showToast:true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Role deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting role: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting role: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Role deleted successfully`)
        }
    })
}