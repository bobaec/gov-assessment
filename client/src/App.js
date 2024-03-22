import React, { useState, useEffect } from "react";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        if (boolean) {
            localStorage.setItem("authenticated", boolean);
        } else {
            localStorage.removeItem("authenticated");
        }
        setIsAuthenticated(boolean);
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
            <Navbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login setAuth={setAuth} />} />
                <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate replace to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
