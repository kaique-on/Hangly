import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const token = localStorage.getItem("token");

    const fetchProfile = async () => {
        if (!token) return;
        try {
            const response = await axios.get("http://localhost:8081/profile", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(token);
            setUser(response.data);
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [token]);

    return (
        <UserContext.Provider value={{ user, setUser, fetchProfile }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);