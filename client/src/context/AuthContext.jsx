import { useState, useContext, createContext, useEffect, } from "react";
import AuthServices from "../services/auth_services";
import TokenService from "../services/token_services";

const AuthContext = createContext(null);

function getUser() {
    const currentUser = TokenService.getUser();
    return currentUser;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);
    const login = (user) => setUser(user);
    const logout = () => {
        AuthServices.logout();
        setUser(null);
    };

    useEffect(() => {
        TokenService.setUser(user);
    },[user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);