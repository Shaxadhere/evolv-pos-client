import {
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Delete, Get, Post, Put } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";
import { prepareData } from "../helpers/apiHelper";

export const useCohorts = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["cohorts", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.COHORTS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}

export const useCohortsFacet = () => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["cohortsFacet"],
        queryFn: async () => {
            const { data } = await Get(API_CONSTANTS.COHORTS.getFacet, token, {})
            return data
        },
    })
}

export const useCohortOptions = (params = {}) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["cohortOptions", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.COHORTS.getOptions}?${appendQueryParams(params)}`, token, {})
            return data
        },
        staleTime: 1000 * 60 * 60
    })
}


export const useCreateCohort = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.COHORTS.dataKeys)
            const { data } = await Post({
                path: API_CONSTANTS.COHORTS.base,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Cohort created successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while creating cohort: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Creating cohort: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Cohort created successfully`)
        }
    })
}

export const useUpdateCohort = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (body) => {
            body = prepareData(body, API_CONSTANTS.COHORTS.dataKeys)
            const { data } = await Put({
                path: `${API_CONSTANTS.COHORTS.base}/${body.id}`,
                token,
                bodyObj: body,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Cohort updated successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while updating cohort: ${error}`)
        },
        onMutate: (body) => {
            console.log(`onMutate: Updating cohort: ${body}`)
        },
        onSettled: () => {
            console.log(`onSettled: Cohort updated successfully`)
        }
    })
}

export const useDeleteCohort = () => {
    const token = useSelector((state) => state.user.token)
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await Delete({
                path: `${API_CONSTANTS.COHORTS.base}/${id}`,
                token,
                showToast: true
            })
            return data
        },
        onSuccess: (data) => {
            console.log(`onSuccess: Cohort deleted successfully: ${data}`)
        },
        onError: (error) => {
            console.log(`onError: Error while deleting cohort: ${error}`)
        },
        onMutate: (id) => {
            console.log(`onMutate: Deleting cohort: ${id}`)
        },
        onSettled: () => {
            console.log(`onSettled: Cohort deleted successfully`)
        }
    })
}