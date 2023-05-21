var Config = {
    ENVIRONMENT: "LOCAL", //current selected environment
    ENVIRONMENTS: {
        LOCAL: {
            BASE_URL: "http://localhost:5000/api",
            PERSIST_SECRET_KEY: "local.secret",
            CONTAINER: "http://localhost:5000/uploads/"
        },
        DEVELOPMENT: {
            BASE_URL: "https://shark-app-f5832.ondigitalocean.app/api",
            PERSIST_SECRET_KEY: "dev.secret",
            CONTAINER: "http://localhost:5000/uploads/"
        },
        STAGING: {
            BASE_URL: "http://stg.evolvpos:5000/api",
            PERSIST_SECRET_KEY: "stg.secret",
            CONTAINER: "http://localhost:5000/uploads/"
        },
        PRODUCTION: {
            BASE_URL: "https://evolvpos.net/api",
            PERSIST_SECRET_KEY: "83jd9mjDWBABEILYoaiskdp9kDALASROWnuhnkaSADOKLKASDMNV",
            CONTAINER: "http://localhost:5000/uploads/"
        }
    }
};
Config.env = () => {
    return Config.ENVIRONMENTS[Config.ENVIRONMENT];
};
export default Config;