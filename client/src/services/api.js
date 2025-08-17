import axios from "axios"
const baseURL = import.meta.env.VITE_BASE_URL;
import TokenServices from "./token_services";
const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

//add interceptor to request object
instance.interceptors.request.use(
    (config) => {
        //recive after login
        //TO DO
        const token = TokenServices.getLocalAcessToken();
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;