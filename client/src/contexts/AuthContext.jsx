import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const setAuth = (userData) => {
        if (userData) {
            localStorage.setItem('authenticated', JSON.stringify(userData));
            setUser(userData.info);
        } else {
            localStorage.removeItem('authenticated');
            setUser({});
        }
        setIsAuthenticated(userData);
    };

    useEffect(() => {
        const cache = localStorage.getItem("authenticated");
        if (!cache) {
            localStorage.removeItem("authenticated");
        } else {
            setIsAuthenticated(JSON.parse(cache).authenticated);
            setUser(JSON.parse(cache).info);
        } 
    }, [])

    const authContextValue = {
        isAuthenticated,
        user,
        setAuth,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);