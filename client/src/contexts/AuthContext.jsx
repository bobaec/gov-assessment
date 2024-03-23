import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const setAuth = (userData) => {
        if (userData) {
            localStorage.setItem('authenticated', JSON.stringify(userData));
            setUser(userData.info);
            navigate('/dashboard');
        } else {
            localStorage.removeItem('authenticated');
            setUser({});
            navigate('/login');
        }
        setIsAuthenticated(userData);
    };

    useEffect(() => {
        if (!localStorage.getItem("authenticated")) {
            localStorage.removeItem("authenticated");
        } else {
            setIsAuthenticated(localStorage.getItem("authenticated"))
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