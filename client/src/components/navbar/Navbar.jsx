import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css';
import Logo from '../../assets/image/logo.svg';
// import Input from '../../utils/input/Input';
import SearchHeader from '../search/SearchHeader.jsx';

const Navbar = () => {
  const [search, setSearch] = useState('');
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__logo">
          {' '}
          <img src={Logo} alt="logo_img" className="logo_img" />{' '}
        </div>
        <div className="navbar__search">
        <div className='search'> <SearchHeader value={search} setValue={setSearch} type="text" placeholder="Поиск..." /> </div>
          
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
