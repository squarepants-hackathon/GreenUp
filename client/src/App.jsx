import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} exact />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/contact-us" element={<Contact />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
