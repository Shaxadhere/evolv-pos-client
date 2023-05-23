import Config from "../../config"

export const BASE_URL = Config.env().BASE_URL

const API_CONSTANTS = {
    //General
    UPLOADS: {
        post: "/files/upload",
        get: (filename) => `/uploads/${filename}`,
    },
    AUTH: {
        login: "/auth/signin",
        updatePassword: "/auth/change-password",
    },

    //DATA 
    PRODUCTS: {
        base: "/product",
        dataKeys: ["name", "description", "pricePerUnit", "category", "photo"]
    },
    CATEGORIES: {
        base: "/category",
        dataKeys: ["name", "description"]
    },
    STORES: {
        base: "/store",
        dataKeys: ["name", "address", "contact", "owner", "accountExpiry", "status"]
    },
    SALES: {
        base: "/sale",
        report: "/sale/report",
    },
    PRODUCTS: {
        base: "/product",
        dataKeys: ["name", "description", "pricePerUnit", "category", "photo"]
    },
    USERS: {
        base: "/user",
        store:"/user/store",
        dataKeys: ["name", "email", "contact", "password",]
    },

}

export default API_CONSTANTS