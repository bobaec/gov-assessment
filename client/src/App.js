import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./contexts/AuthContext";
import "./App.scss";

function App() {
    return (
        <div className="website-container">
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/dashboard" element={<DashboardPrivateRoute />} />
            </Routes>
        </div>
    );
}

function DashboardPrivateRoute() {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Dashboard /> : <Navigate to="/login" />;
}

export default App;
