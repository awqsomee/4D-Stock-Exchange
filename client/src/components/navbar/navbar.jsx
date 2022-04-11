import React from "react";
import "./navbar.css";
import Logo from "../../assets/image/logo.svg";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="logo" className="navbar__logo" />
                <div className="navbar__search">Поиск</div>
                <div className="navbar__login">Войти</div>
                <div className="navbar__registration">Регистрация</div>
            </div>
        </div>
    );
};

export default Navbar;
