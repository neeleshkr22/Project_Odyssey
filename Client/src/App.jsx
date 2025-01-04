import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Dashboard from "./components/Dashboard";
const App = () => {
  return (
    <div className="h-screen bg-base-100">
      <Navbar />
      <div className="pt-16"> 
        <Dashboard/>
      </div>
    </div>
  );
};

export default App;

