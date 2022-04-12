import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar.jsx';
import './app.css';
import './navbar/navbar.css';
import Registration from './registration/Registration.jsx';
import Login from './login/Login.jsx';
import Footer from './footer/Footer.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
