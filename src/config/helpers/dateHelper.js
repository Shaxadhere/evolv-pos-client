import moment from "moment/moment"
import { DEFAULT_DATETIME_FORMAT, DEFAULT_DATE_FORMAT } from "../constants"

const formatDate = (date, isInput) => {
    if (isInput) return moment(date).format("YYYY-MM-DD")
    return moment(date).format(DEFAULT_DATE_FORMAT)
}

const formatTime = (time, isInput) => {
    if (isInput) return moment(time).format("HH:ii a")
    return moment(time)
}

const formatDateTime = (dateTime, isInput) => {
    if (isInput) return moment(dateTime).format("YYYY-MM-DDTHH:mm")
    return moment(dateTime).format(DEFAULT_DATETIME_FORMAT)
}

const formatDateTimeFromNow = (dateTime) => {
    return moment(dateTime).fromNow()
}

export { formatDate, formatTime, formatDateTime, formatDateTimeFromNow }