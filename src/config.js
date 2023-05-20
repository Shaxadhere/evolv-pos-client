var Config = {
    ENVIRONMENT: "DEVELOPMENT", //current selected environment
    ENVIRONMENTS: {
        LOCAL: {
            BASE_URL: "http://localhost:5000/api",
            PERSIST_SECRET_KEY: "local.secret",
        },
        DEVELOPMENT: {
            BASE_URL: "https://shark-app-f5832.ondigitalocean.app/api",
            PERSIST_SECRET_KEY: "dev.secret",
        },
        STAGING: {
            BASE_URL: "http://stg.evolvpos:5000/api",
            PERSIST_SECRET_KEY: "stg.secret",
        },
        PRODUCTION: {
            BASE_URL: "https://evolvpos.net/api",
            PERSIST_SECRET_KEY: "83jd9mjDWBABEILYoaiskdp9kDALASROWnuhnkaSADOKLKASDMNV",
        }
    }
};
Config.env = () => {
    return Config.ENVIRONMENTS[Config.ENVIRONMENT];
};
export default Config;