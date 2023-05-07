import {
    useQuery,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { Get } from "../api";
import appendQueryParams from "../helpers/appendQueryParams";
import API_CONSTANTS from "../constants/api";

export const useExams = (params) => {
    const token = useSelector((state) => state.user.token)
    return useQuery({
        queryKey: ["exams", params],
        queryFn: async () => {
            const { data } = await Get(`${API_CONSTANTS.EXAMS.base}?${appendQueryParams(params)}`, token, {})
            return data
        },
        keepPreviousData: true
    })
}