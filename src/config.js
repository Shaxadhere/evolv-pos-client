var Config = {
    ENVIRONMENT: "DEVELOPMENT", //current selected environment
    ENVIRONMENTS: {
        LOCAL: {
            BASE_URL: "https://localhost:44318/api",
            FILE_CONTAINER: "CONTAINER_ID",
            PERSIST_SECRET_KEY: "83jd9mjoaiskdp9kDASJDO#)@IDK)SAKDOFAKSdlaskf032kdaLASMCAXMCKL#@)DQsmaW_D{L#PKDOSJdaFAJLSKCLAMLK_@_@#)I@KMLDJSALDJLASROW",
        },
        DEVELOPMENT: {
            BASE_URL: "https://evolvlmsdev.azurewebsites.net/api",
            FILE_CONTAINER: "CONTAINER_ID",
            PERSIST_SECRET_KEY: "83jd9mjoaiskdp9kDASJDO#)@IDK)SAKDOFAKSdlaskf032kdaLASMCAXMCKL#@)DQsmaW_D{L#PKDOSJdaFAJLSKCLAMLK_@_@#)I@KMLDJSALDJLASROW",
        },
        STAGING: {
            BASE_URL: "http://localhost:5000/api",
            FILE_CONTAINER: "CONTAINER_ID",
            PERSIST_SECRET_KEY: "83jd9mjoaiskdp9kDASJDO#)@IDK)SAKDOFAKSdlaskf032kdaLASMCAXMCKL#@)DQsmaW_D{L#PKDOSJdaFAJLSKCLAMLK_@_@#)I@KMLDJSALDJLASROW",
        },
        PRODUCTION: {
            BASE_URL: "http://localhost:5000/api",
            FILE_CONTAINER: "CONTAINER_ID",
            PERSIST_SECRET_KEY: "83jd9mjoaiskdp9kDASJDO#)@IDK)SAKDOFAKSdlaskf032kdaLASMCAXMCKL#@)DQsmaW_D{L#PKDOSJdaFAJLSKCLAMLK_@_@#)I@KMLDJSALDJLASROW",
        }
    }
};
Config.env = () => {
    return Config.ENVIRONMENTS[Config.ENVIRONMENT];
};
export default Config;