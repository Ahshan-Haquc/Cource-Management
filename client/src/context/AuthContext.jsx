import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("https://cource-management-backend.vercel.app/api/auth/me", { withCredentials: true })
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
