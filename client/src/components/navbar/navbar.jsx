import React from "react";
import "./navbar.css";
import Logo from "../../assets/image/logo.svg"

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="container">

                <img src={Logo} alt="" className="navbar__logo"/> 
                
                 <div className="navbar__search">hello</div >
                 <div className="navbar__login">login</div> 
                 <div className="navbar__registration">reg</div> 
            </div>
           
        </div>
    )
}

export default Navbar;