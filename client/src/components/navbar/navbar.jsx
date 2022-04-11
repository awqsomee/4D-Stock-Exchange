import React from "react";
import "./navbar.css";
import Logo from "../../assets/image/logo.svg"

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="container">

                <div className="container2"><img src={Logo} alt="" className="navbar__logo"/> </div>
                
                <div className="container3"> <div className="navbar__search">hello</div ></div>
                <div className="container4"> <div className="navbar__login">login</div> </div>
                <div className="container5"> <div className="navbar__registration">reg</div> </div>
            </div>
           
        </div>
    )
}

export default Navbar;