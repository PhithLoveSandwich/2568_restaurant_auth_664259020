import api from "./api";
import TokenServices from "./token_services";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async (username, name, email, password) =>{
    return await api.post(API_URL + "/signup", {
        username,
        name,
        email,
        password
    });
};

const login = async (username, password) =>{
    const response = await api.post(API_URL + "/signin", {
        username,
        password
    });
    // Save user data to local storage
    if(!response.data.token){
        return response;
    }
    TokenServices.setUser(response.data);
    return response;
};

const logout = () => {
    TokenServices.removeUser();
};

const AuthServices = {
    register,
    login,
    logout
};

export default AuthServices;