import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import Logo from '../../../assets/Icons/logo.svg'
import ModalBox from '../ModalBox/ModalBox'
import Registration from '../../authentification/registration/Registration.jsx'
import Login from '../../authentification/login/Login'
import SearchHeader from '../search/SearchHeader.jsx'
import '../buttons/buttons.css'
import { logout } from '../../../reducers/userReducer'

const Navbar = (props) => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  // const [search, setSearch] = useState('')
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
          <NavLink to="/stocks">
            <img src={Logo} alt="logo_img" className="logo_img" />
          </NavLink>
        </div>
        <div className="navbar__search">
          <div>
            <SearchHeader value={props.search} type="text" placeholder="Поиск..." />
          </div>
        </div>
        {!isAuth && (
          <div className="navbar__login button button__normal" onClick={() => setModalBoxLog(true)}>
            Войти
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration button button__normal" onClick={() => setModalBoxReg(true)}>
            Регистрация
          </div>
        )}
        {isAuth && (
          <div className="navbar__registration" onClick={() => dispatch(logout())}>
            Личный
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
