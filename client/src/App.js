import React, { useState, useEffect } from "react";
import { Routes, Route, Redirect, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    }

    return (
        <div className="website-container">
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login setAuth={setAuth} />} />
                <Route exact path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate replace to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
