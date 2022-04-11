import React from "react";
import Navbar from "./navbar/Navbar.jsx";
import "./navbar/navbar.css";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Routes>
                    <Route path="/registratoin" component="Registration" />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
