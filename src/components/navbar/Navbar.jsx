import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import Logo from '../../assets/Icons/logo.svg'
import ModalBox from '../UI/ModalBox/ModalBox'
import ModalBoxAcc from '../UI/ModalBox/ModalBoxAcc'
import Registration from '../authentification/registration/Registration.jsx'
import Login from '../authentification/login/Login'
import SearchHeader from '../UI/search/SearchHeader.jsx'
import '../UI/buttons/buttons.css'
import UserProfile from '../../assets/Icons/user.svg'
import Wallet from '../../assets/Icons/wallet.svg'
import Portfolio from '../../assets/Icons/briefcase.svg'
import '../currency/balance/balance.css'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../redux'
import { logout, setUser } from '../../redux/slice'

const Navbar = () => {
  const isAuth = useSelector((state) => state.toolkit.isAuth)
  const dispatch = useDispatch()
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

      {isAuth && (
        <ModalBoxAcc visible={modalBoxAcc} setVisible={setModalBoxAcc}>
          <div className="acc_pop_up">
            <NavLink to="/wallet" className="acc_pop_up acc_pop_up__b" onClick={() => setModalBoxAcc(false)}>
              <div className="acc_pop_up acc_pop_up__b">{`${new Intl.NumberFormat('ru-RU').format(
                store.getState(setUser).toolkit.currentUser.balance
              )} ₽`}</div>
            </NavLink>
          </div>

          <div className="acc_pop_up">
            <NavLink to="/account" className="acc_in" onClick={() => setModalBoxAcc(false)}>
              <div>Аккаунт</div>
            </NavLink>
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
      )}
      <div className="container">
        <div className="navbar__logo">
          <NavLink to="/stocks">
            <img src={Logo} alt="navbar__logo__img"  />
          </NavLink>
        </div>
        <div className="option_wrapper">
            <SearchHeader />

            <div className="navbar__buttons">
                {!isAuth && (
                  <div className=" button button__normal " onClick={() => setModalBoxLog(true)}>
                    Войти
                  </div>
                )}
                {!isAuth && (
                  <div className=" button button__normal navbar__registration" onClick={() => setModalBoxReg(true)}>
                    Регистрация
                  </div>
                )}
                {isAuth && (
                  <div className="navbar__wallet">
                    <NavLink to="/wallet">
                      <img src={Wallet} alt="Кошелек" width="25" height="25"/>
                    </NavLink>
                  </div>
                )}
                {isAuth && (
                  <div className="navbar__portfolio">
                    <NavLink to="/portfolio">
                      <img src={Portfolio} alt="Портфель" width="25" height="25"/>
                    </NavLink>
                  </div>
                )}
                {isAuth && (
                  <div className="navbar__account" onClick={() => setModalBoxAcc(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 45 45" fill="none" className="icon">
                      <path d="M22.5 45C10.0385 45 0 34.9615 0 22.5C0 10.0385 10.0385 0 22.5 0C34.9615 0 45 10.0385 45 22.5C45 34.9615 34.9615 45 22.5 45ZM22.5 3.46154C11.9423 3.46154 3.46154 11.9423 3.46154 22.5C3.46154 33.0577 11.9423 41.5385 22.5 41.5385C33.0577 41.5385 41.5385 33.0577 41.5385 22.5C41.5385 11.9423 33.0577 3.46154 22.5 3.46154Z" fill="white"/>
                      <path d="M22.4995 23.7921C17.6534 23.7921 13.8457 19.9844 13.8457 15.1382C13.8457 10.2921 17.6534 6.48438 22.4995 6.48438C27.3457 6.48438 31.1534 10.2921 31.1534 15.1382C31.1534 19.9844 27.3457 23.7921 22.4995 23.7921ZM22.4995 9.94591C19.5572 9.94591 17.3072 12.1959 17.3072 15.1382C17.3072 18.0805 19.5572 20.3305 22.4995 20.3305C25.4418 20.3305 27.6918 18.0805 27.6918 15.1382C27.6918 12.1959 25.4418 9.94591 22.4995 9.94591Z" fill="white"/>
                      <path d="M38.9415 35.9073C38.4223 35.9073 38.0761 35.7343 37.73 35.3881C34.0953 31.4073 28.73 28.9843 23.1915 28.9843H21.6338C16.6146 28.9843 11.7684 30.8881 8.13379 34.5227C7.44148 35.215 6.22994 35.042 5.71071 34.3497C5.19148 33.6573 5.19148 32.792 5.71071 32.0996C10.0376 27.9458 15.7492 25.6958 21.6338 25.6958H23.1915C29.5953 25.6958 35.8261 28.465 40.153 33.1381C40.8453 33.8304 40.8453 34.8689 39.98 35.5612C39.8069 35.7343 39.4607 35.9073 38.9415 35.9073Z" fill="white"/>
                    </svg>
                    {/* <img src={UserProfile} alt="Аккаунт"  /> */}
                  </div>
                )}
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar
