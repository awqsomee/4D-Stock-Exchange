import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './navbar.css'
import Logo from '../../assets/image/logo.svg'
// import Input from '../../utils/input/Input';
import SearchHeader from '../search/SearchHeader.jsx'
import '../../utils/buttons/buttons.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../reducers/userReducer'

const Navbar = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar__logo">
          <NavLink to="/stocks">
            <img src={Logo} alt="logo_img" className="logo_img" />
          </NavLink>
        </div>
        <div className="navbar__search">
          <div>
            <SearchHeader value={search} setValue={setSearch} type="text" placeholder="Поиск..." />
          </div>
        </div>
        {!isAuth && (
          <div className="navbar__login">
            <NavLink className=" button button__normal" to="/login">
              Войти
            </NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="navbar__registration">
            <NavLink className=" button button__normal" to="/registration">
              Регистрация
            </NavLink>
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
