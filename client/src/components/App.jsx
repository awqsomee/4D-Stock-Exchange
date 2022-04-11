import React from "react";
import Navbar from "./navbar/navbar.jsx";
import "./navbar/navbar.css";
import "./app.css";
import {BrowserRoter, Route, Routes} from "react-router-dom"

function App() {
  return (
    
      <div className="app">
        <Navbar />
        {/* <Routes>
          <Route path="/registratoin" component="Registration"/>
        </Routes> */}
      </div>
  
    
  );
}

export default App;
