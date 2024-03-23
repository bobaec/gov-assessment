import React, { useState, useEffect } from "react";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const setAuth = (user) => {
        if (user) {
            localStorage.setItem("authenticated", JSON.stringify(user));
            setUser(user.info);
        } else {
            localStorage.removeItem("authenticated");
        }
        setIsAuthenticated(user);
    }

    useEffect(() => {
        if (!localStorage.getItem("authenticated")) {
            localStorage.removeItem("authenticated");
        } else {
            setIsAuthenticated(localStorage.getItem("authenticated"))
        }
    }, [])

    return (
        <div className="website-container">
            <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} user={user} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login setAuth={setAuth} />} />
                <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
