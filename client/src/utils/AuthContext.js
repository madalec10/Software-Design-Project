import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Load user from localStorage on app start
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);  // Parse the JSON string correctly
                setUser(parsedUser);  // Set the user data
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
            }
        }
    }, []);
    // Login function
    const login = (email, role) => {
        const userData = { email, role };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Save as JSON
    };

    // Logout function
    const logout = async () => {
        try {
        //  Call backend to clear cookie
        await axios.post(
                "http://localhost:8800/logout",
                {},
                { withCredentials: true } // important so cookie is sent
            );
        } catch (err) {
            console.error("Failed to logout on backend", err);
        }

        // Clear frontend state
        localStorage.removeItem("user");
        setIsLoggingOut(true);
        setUser(null);
        setTimeout(() => setIsLoggingOut(false), 500);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggingOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);