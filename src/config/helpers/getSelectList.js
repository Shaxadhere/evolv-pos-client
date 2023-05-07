import { useCourseOptions } from "../query/courseQuery"
import { useQualificationOptions, useQualifications } from "../query/qualificationQuery"
import { useUserOptions, useUsers } from "../query/userQuery"

export const ENTITIES = {
    USERS: {
        key: 'USERS',
        options: useUserOptions,
    },
    QUALIFICATIONS: {
        key: 'QUALIFICATIONS',
        options: useQualificationOptions,
    },
    COURSE: {
        key: 'COURSE',
        options: useCourseOptions,
    },
}

const getSelectList = (key) => {
    const entity = ENTITIES[key]
    const { options } = entity
    const { data: optionsData } = options()
    const optionsList = optionsData?.map((option) => ({
        value: option.id,
        label: option.name,
    }))

    return optionsList
}

export default getSelectList