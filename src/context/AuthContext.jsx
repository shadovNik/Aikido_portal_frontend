import { createContext, useState } from "react";
import { loginRequest, logoutRequest } from "../api/auth.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);

    const login = async (username, password) => {
        const data = await loginRequest(username, password);
        setAccessToken(data.access);
    };

    const logout = async () => {
        await logoutRequest();
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
