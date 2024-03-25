import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAdministrator } from '../utilities/utilities';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [allUsers, setAllUsers] = useState({});

    // use localStorage for caching user

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

    const getAllUsers = async () => {
        try {
            const result = await fetch("/admin/all-users", {
                method: "GET",
            });
            const response = await result.json();
            if (!response) {
                throw new Error('Could not get all users');
            } else {
                const sortedUsersArray = response.sort((a, b) => a.user_id - b.user_id);
                setAllUsers(sortedUsersArray);
            }
        } catch (error) {
            console.log('getAllUsers', error.message);
        }
    }

    useEffect(() => {
        const cache = localStorage.getItem("authenticated");
        if (!cache) {
            localStorage.removeItem("authenticated");
        } else {
            setIsAuthenticated(JSON.parse(cache).authenticated);
            setUser(JSON.parse(cache).info);
            if (isAdministrator(JSON.parse(cache).info.role_id)) {
                getAllUsers();
            }
        }
    }, [])

    const authContextValue = {
        isAuthenticated,
        user,
        setAuth,
        getAllUsers,
        allUsers,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);