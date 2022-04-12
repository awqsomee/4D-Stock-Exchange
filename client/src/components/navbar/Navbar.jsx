import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/image/logo.svg";
import Input from "../../utils/input/Input";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="logo" className="navbar__logo" />
                <div>
                    <Input />
                </div>
                <div className="navbar__login">
                    <NavLink to="/login">Войти</NavLink>
                </div>
                <div className="navbar__registration">
                    <NavLink to="/registration">Регистрация</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
