import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './navbar.css'
import Logo from '../../assets/image/logo.svg'
import Input from '../../utils/input/Input'
import ModalBox from '../UI/ModalBox/ModalBox'
import Registration from '../registration/Registration.jsx'
import Login from '../login/Login'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [modalBoxReg, setModalBoxReg] = useState(false)
  const [modalBoxLog, setModalBoxLog] = useState(false)
  return (
    <div className="navbar">
      <ModalBox visible={modalBoxLog} setVisible={setModalBoxLog}>
        <Login sVisible={setModalBoxLog} />
      </ModalBox>
      <ModalBox visible={modalBoxReg} setVisible={setModalBoxReg}>
        <Registration sVisible={setModalBoxReg} />
      </ModalBox>
      <div className="container">
        <div className="navbar__logo">
          <img src={Logo} alt="logo_img" className="logo_img" />
        </div>
        <div className="navbar__search">
          <Input value={search} setValue={setSearch} type="text" placeholder="Поиск..." />
        </div>
        <div className="navbar__login" onClick={() => setModalBoxLog(true)}>
          Войти
        </div>
        <div className="navbar__registration" onClick={() => setModalBoxReg(true)}>
          Регистрация
        </div>
      </div>
    </div>
  )
}

export default Navbar
