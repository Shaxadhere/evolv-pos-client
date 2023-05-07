import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useEmailTemplates = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["email-templates", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.EMAIL_TEMPLATES.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useEmailTemplatesFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["emailTemplatesFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.EMAIL_TEMPLATES.getFacet, token, {})
            return data
        },
    })
}

export const useCreateEmailTemplate = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.EMAIL_TEMPLATES.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.EMAIL_TEMPLATES.base,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Email template created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating email template: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating email template: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Email template created successfully`)
        }
    })
}

export const useUpdateEmailTemplate = (id) => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.EMAIL_TEMPLATES.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.EMAIL_TEMPLATES.base}/${id}`,
                token,
                bodyObj: body
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Email template updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating email template: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating email template: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Email template updated successfully`)
        }
    })
}

export const useDeleteEmailTemplate = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.EMAIL_TEMPLATES.base}/${id}`,
                token,
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Email template deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting email template: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Deleting email template: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Email template deleted successfully`)
        }
    })
}