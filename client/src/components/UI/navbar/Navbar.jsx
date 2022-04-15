import React, { useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './navbar.css'
import Logo from '../../../assets/Icons/logo.svg'
import ModalBox from '../ModalBox/ModalBox'
import ModalBoxAcc from '../ModalBox/ModalBoxAcc'
import Registration from '../../authentification/registration/Registration.jsx'
import Login from '../../authentification/login/Login'
import SearchHeader from '../search/SearchHeader.jsx'
import '../buttons/buttons.css'
import { logout } from '../../../reducers/userReducer'
import UserProfile from '../../../assets/Icons/user.svg'
import Wallet from '../../../assets/Icons/wallet.svg'
import Portfolio from '../../../assets/Icons/portfolio.svg'

const Navbar = (props) => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  // const [search, setSearch] = useState('')
  const [modalBoxReg, setModalBoxReg] = useState(false)
  const [modalBoxLog, setModalBoxLog] = useState(false)
  const [modalBoxAcc, setModalBoxAcc] = useState(false)
  return (
    <div className="navbar">
      <ModalBox visible={modalBoxLog} setVisible={setModalBoxLog}>
        <Login sVisible={setModalBoxLog} />
      </ModalBox>
      <ModalBox visible={modalBoxReg} setVisible={setModalBoxReg}>
        <Registration sVisible={setModalBoxReg} />
      </ModalBox>

      <ModalBoxAcc visible={modalBoxAcc} setVisible={setModalBoxAcc}>
        <div className="acc_pop_up">
          {' '}
          <NavLink to="/account">
            <div className="acc_in">Аккаунт</div>
          </NavLink>{' '}
        </div>
        <div
          className="acc_pop_up"
          onClick={() => {
            dispatch(logout())
            setModalBoxAcc(false)
          }}
        >
          Выйти
        </div>
      </ModalBoxAcc>

      <div className="container">
        <div className="navbar__logo">
          <NavLink to="/stocks">
            <img src={Logo} alt="logo_img" width={150} />
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
          <div className="navbar__wallet">
            <NavLink to="/wallet">
              <img src={Wallet} alt="Кошелек" width={45} />
            </NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__portfolio">
            <NavLink to="/portfolio">
              <img src={Portfolio} alt="Портфель" width={45} />
            </NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__account" onClick={() => setModalBoxAcc(true)}>
            <img src={UserProfile} alt="Аккаунт" width={70} />
          </div>
        )}
        {/* {isAuth && (
          <div className="navbar__login button button__normal">
            <NavLink to="/wallet">Личный</NavLink>
          </div>
        )}
        {isAuth && (
          <div className="navbar__registration button button__normal" onClick={() => dispatch(logout())}>
            Личный
          </div>
        )} */}
      </div>
    </div>
  )
}

export default Navbar
