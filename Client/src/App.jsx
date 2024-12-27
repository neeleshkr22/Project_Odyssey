
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import ThemeSettings from "./components/ThemeSettings";

const App = () => {
  return (
    <div className="h-screen bg-base-100">
      <Navbar />
      <div className="pt-16"> {}
        <Routes>
          <Route path="/" element={<div>Welcome to Home Page</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<ThemeSettings />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

