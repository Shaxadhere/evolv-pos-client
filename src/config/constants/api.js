import Config from "../../config"

export const BASE_URL = Config.env().BASE_URL
export const FILE_CONTAINER = Config.env().FILE_CONTAINER

const API_CONSTANTS = {
    //General
    UPLOADS: {
        post: "/files/upload",
        get: (fileName, isPublic = false, expiryMinutes = '') => `/files/get?fileName=${isPublic ? "[public]" : "[private]"}${fileName}&expiryMinutes=${expiryMinutes}`,
    },
    AUTH: {
        login: "/authorize",
        updateProfile: "/users/me/update-profile",
        updateProfilePicture: "/users/me/update-profile/picture",
        updatePassword: "/users/me/update-profile/password",
    },


    //Syllabus
    QUALIFICATIONS: {
        base: "/qualifications", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,statuses}
        getFacet: "/qualifications/facet",
        getOptions: "/qualifications/select-options",
        dataKeys: ["name", "status"]
    },
    COURSES: {
        base: "/courses", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,qualifications,statuses}
        getFacet: "/courses/facet",
        getOptions: "/courses/select-options",
        dataKeys: ["qualificationId", "id", "name", "status", "createdOn", "updatedOn", "deletedOn"]
    },
    COHORTS: {
        base: "/cohorts", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,courses,teachers,statuses}
        getFacet: "/cohorts/facet",
        getOptions: "/cohorts/select-options",
        dataKeys: ["courseId", "teacherIds", "startDate", "endDate", "order", "shortDescription", "longDescription", "price", "discount", "thumbnailImageFile", "headerImageFile", "files", "id", "name", "status", "isDeleted", "createdOn", "updatedOn", "deletedOn"]
    },
    CHAPTERS: {
        base: "/chapters", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,cohorts,statuses}
        getFacet: "/chapters/facet",
        getOptions: "/chapters/select-options",
        dataKeys: ["name", "cohortId", "isDemo", "order", "files", "status"]
    },

    //Lectures
    LECTURES: {
        base: "/lectures", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,onlyAvailable,chapters,cohorts,statuses}
        getFacet: "/lectures/facet",
        getOptions: "/lectures/select-options",
        dataKeys: ["name", "cohortId", "chapterId", "availableStartDateTime", "availableEndDateTime", "lectureFile", "order", "status"]
    },
    MEETINGS: {
        base: "/meetings", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,chapters,cohorts,isUpcoming,statuses}
        getFacet: "/meetings/facet",
        getOptions: "/meetings/select-options",
        dataKeys: ["name", "cohortId", "chapterId", "startDateTime", "endDateTime", "postLecture", "status"]
    },

    //Users
    USERS: {
        base: "/users", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,statuses,roles,cohorts}
        getFacet: "/users/facet",
        getOptions: "/users/select-options",
        dataKeys: ["name", "status", "createdOn", "updatedOn", "deletedOn", "phoneNumber", "email", "roleId", "description", "country", "city", "address", "profilePicture", "allowedDevices", "cohorts"]
    },
    ROLES: {
        base: "/user-roles", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,statuses}
        getFacet: "/user-roles/facet",
        getOptions: "/user-roles/select-options",
        dataKeys: ["name", "permissionNames", "status"]
    },
    PERMISSIONS: {
        base: "/user-role-permissions", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,statuses}
        getFacet: "/user-role-permissions/facet",
        getOptions: "/user-role-permissions/select-options",
        dataKeys: ["name", "description", "status"]
    },

    //Emails
    EMAIL_TEMPLATES: {
        base: "/email-templates", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,statuses}
        getFacet: "/email-templates/facet",
        getOptions: "/email-templates/select-options",
        dataKeys: ["name", "htmlTemplate", "status"]
    },

    //Settings
    SETTINGS: {
        base: "/settings", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,statuses}
        getFacet: "/settings/facet",
        getOptions: "/settings/select-options",
        dataKeys: ["name", "value", "status"]
    },

    //Bin
    DELETED_ITEMS: {
        base: "/deleted-items", //options = {searchQuery,pageSize,pageNo,fromDate,toDate,types}
        getFacet: "/deleted-items/facet",
        getOptions: "/deleted-items/select-options",
    },

    //Exams
    EXAMS: {
        base: "/exams", //options = {}
        getFacet: "/exams/facet",
        dataKeys: []
    },

}

export default API_CONSTANTS