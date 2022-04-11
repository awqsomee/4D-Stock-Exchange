import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar/Navbar.jsx";
import "./app.css";
import "./navbar/navbar.css";
import Registration from "./registration/Registration.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
