import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css';
import Logo from '../../assets/image/logo.svg';
import Input from '../../utils/input/Input';
import ModalBox from '../UI/ModalBox/ModalBox';
import Registration from '../registration/Registration.jsx';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [modalBox, setModalBox] = useState(false);
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__logo">
          {' '}
          <img src={Logo} alt="logo_img" className="logo_img" />{' '}
        </div>
        <div className="navbar__search">
          <Input value={search} setValue={setSearch} type="text" placeholder="Поиск..." />
        </div>
        <div className="navbar__login">Войти</div>
        <div className="navbar__registration" onClick={() => setModalBox(true)}>
          <ModalBox visible={modalBox} setVisible={setModalBox}>
            <Registration />
          </ModalBox>
          Регистрация
        </div>
      </div>
    </div>
  );
};

export default Navbar;
