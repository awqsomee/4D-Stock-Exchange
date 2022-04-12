import React from "react";
import Navbar from "./navbar/Navbar.jsx";
import "./navbar/navbar.css";
import Footer from "./footer/Footer.jsx";
import "./footer/footer.css";
import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Routes >
                    <Route path="/registratoin" component="Registration" />
                </Routes>
                
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
