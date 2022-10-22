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

  const netRegistration = () => {
    setModalBoxReg(!modalBoxReg)
    setModalBoxLog(!modalBoxLog)
  }

  return (
    <div className="navbar">
      <ModalBox visible={modalBoxLog} setVisible={setModalBoxLog}>
        <Login toReg={netRegistration} sVisible={setModalBoxLog} />
      </ModalBox>
      <ModalBox visible={modalBoxReg} setVisible={setModalBoxReg}>
        <Registration toLog={netRegistration} sVisible={setModalBoxReg} />
      </ModalBox>

      {isAuth && (
        <ModalBoxAcc visible={modalBoxAcc} setVisible={setModalBoxAcc}>
          <div className="acc_pop_up">
            <NavLink
              to="/wallet"
              className="acc_pop_up__b"
              onClick={() => setModalBoxAcc(false)}
            >
              <div className="acc_pop_up__b">{`${new Intl.NumberFormat(
                'ru-RU'
              ).format(
                store.getState(setUser).toolkit.currentUser.balance
              )} ₽`}</div>
            </NavLink>
          </div>
          <div className="acc_pop_up">
            <NavLink
              to="/account"
              className="acc_pop_up"
              onClick={() => setModalBoxAcc(false)}
            >
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
            <img src={Logo} alt="navbar__logo__img" height={50} />
          </NavLink>
        </div>
        <div className="option_wrapper">
          <SearchHeader />

          <div className="navbar__buttons">
            {!isAuth && (
              <div
                className=" button button__normal "
                onClick={() => setModalBoxLog(true)}
              >
                Войти
              </div>
            )}
            {!isAuth && (
              <div
                className=" button button__normal navbar__registration"
                onClick={() => setModalBoxReg(true)}
              >
                Регистрация
              </div>
            )}
            {isAuth && (
              <div className="navbar__wallet">
                <NavLink to="/wallet">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_903_4383)">
                      <path
                        d="M20.1923 25H4.80769C2.11538 25 0 22.8778 0 20.1767V6.67145C0 6.09265 0.384615 5.70679 0.961538 5.70679H20.1923C22.8846 5.70679 25 7.82904 25 10.5301V20.1767C25 22.8778 22.8846 25 20.1923 25ZM1.92308 7.63611V20.1767C1.92308 21.8166 3.17308 23.0707 4.80769 23.0707H20.1923C21.8269 23.0707 23.0769 21.8166 23.0769 20.1767V10.5301C23.0769 8.89017 21.8269 7.63611 20.1923 7.63611H1.92308Z"
                        fill="white"
                      />
                      <path
                        d="M22.1154 7.6361C21.5385 7.6361 21.1538 7.25024 21.1538 6.67144V3.97039C21.1538 3.29513 20.9615 2.61986 20.3846 2.13753C19.9038 1.75167 19.3269 1.6552 18.75 1.84813L2.69231 5.61031C2.21154 5.70678 1.92308 6.09264 1.92308 6.57497C1.92308 7.15377 1.53846 7.53963 0.961538 7.53963C0.384615 7.53963 0 7.15377 0 6.57497C0 5.22445 0.961539 4.06686 2.21154 3.77746L18.3654 0.111745C19.5192 -0.177654 20.6731 0.111745 21.6346 0.787008C22.5962 1.6552 23.1731 2.8128 23.0769 4.06686V6.67144C23.0769 7.25024 22.6923 7.6361 22.1154 7.6361Z"
                        fill="white"
                      />
                      <path
                        d="M24.0386 19.2119H17.3078C15.1924 19.2119 13.4617 17.4755 13.4617 15.3533C13.4617 13.231 15.1924 11.4946 17.3078 11.4946H24.0386C24.6155 11.4946 25.0001 11.8805 25.0001 12.4593V18.2473C25.0001 18.8261 24.6155 19.2119 24.0386 19.2119ZM17.3078 13.424C16.2501 13.424 15.3847 14.2921 15.3847 15.3533C15.3847 16.4144 16.2501 17.2826 17.3078 17.2826H23.0771V13.424H17.3078Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_903_4383">
                        <rect width="25" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </NavLink>
              </div>
            )}
            {isAuth && (
              <div className="navbar__portfolio">
                <NavLink to="/portfolio">
                  <svg
                    width="28"
                    height="25"
                    viewBox="0 0 28 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_903_4381)">
                      <path
                        d="M23.3654 13.3997H4.5254C4.16556 13.3997 3.8728 13.1069 3.8728 12.7471C3.8728 12.3872 4.16556 12.0945 4.5254 12.0945H23.3654C23.7252 12.0945 24.018 12.3872 24.018 12.7471C24.018 13.1069 23.7252 13.3997 23.3654 13.3997Z"
                        fill="white"
                      />
                      <path
                        d="M16.8944 16.5712H11.0027C10.6429 16.5712 10.3501 16.2784 10.3501 15.9186V12.8874C10.3501 12.5275 10.6429 12.2348 11.0027 12.2348C11.3625 12.2348 11.6553 12.5275 11.6553 12.8874V15.266H16.2357V12.7471C16.2357 12.3872 16.5284 12.0945 16.8883 12.0945C17.2481 12.0945 17.5409 12.3872 17.5409 12.7471V15.9186C17.547 16.2784 17.2542 16.5712 16.8944 16.5712Z"
                        fill="white"
                      />
                      <path
                        d="M17.3823 6.30032C16.9309 6.30032 16.565 5.93437 16.565 5.48304V4.28153C16.565 2.82386 15.3818 1.64064 13.9241 1.64064C12.4664 1.64064 11.2832 2.82386 11.2832 4.28153V5.48304C11.2832 5.93437 10.9173 6.30032 10.466 6.30032C10.0146 6.30032 9.64868 5.93437 9.64868 5.48304V4.28153C9.64868 1.9212 11.5699 0 13.9302 0C16.2905 0 18.2117 1.9212 18.2117 4.28153V5.48304C18.1995 5.93437 17.8336 6.30032 17.3823 6.30032Z"
                        fill="white"
                      />
                      <path
                        d="M25.3903 25H2.45792C1.10393 25 0 23.9022 0 22.5421V7.12369C0 5.7697 1.10393 4.66577 2.45792 4.66577H25.3903C26.7443 4.66577 27.8482 5.7697 27.8482 7.12369V22.5482C27.8482 23.9022 26.7443 25 25.3903 25ZM2.45792 6.30032C2.00659 6.30032 1.64064 6.66626 1.64064 7.11759V22.5421C1.64064 22.9934 2.00659 23.3594 2.45792 23.3594H25.3903C25.8417 23.3594 26.2076 22.9934 26.2076 22.5421V7.12369C26.2076 6.67236 25.8417 6.30642 25.3903 6.30642C25.3903 6.30032 2.45792 6.30032 2.45792 6.30032Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_903_4381">
                        <rect width="27.85" height="25" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </NavLink>
              </div>
            )}
            {isAuth && (
              <div
                className="navbar__account"
                onClick={() => setModalBoxAcc(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 45 45"
                  fill="none"
                  className="icon"
                >
                  <path
                    d="M22.5 45C10.0385 45 0 34.9615 0 22.5C0 10.0385 10.0385 0 22.5 0C34.9615 0 45 10.0385 45 22.5C45 34.9615 34.9615 45 22.5 45ZM22.5 3.46154C11.9423 3.46154 3.46154 11.9423 3.46154 22.5C3.46154 33.0577 11.9423 41.5385 22.5 41.5385C33.0577 41.5385 41.5385 33.0577 41.5385 22.5C41.5385 11.9423 33.0577 3.46154 22.5 3.46154Z"
                    fill="white"
                  />
                  <path
                    d="M22.4995 23.7921C17.6534 23.7921 13.8457 19.9844 13.8457 15.1382C13.8457 10.2921 17.6534 6.48438 22.4995 6.48438C27.3457 6.48438 31.1534 10.2921 31.1534 15.1382C31.1534 19.9844 27.3457 23.7921 22.4995 23.7921ZM22.4995 9.94591C19.5572 9.94591 17.3072 12.1959 17.3072 15.1382C17.3072 18.0805 19.5572 20.3305 22.4995 20.3305C25.4418 20.3305 27.6918 18.0805 27.6918 15.1382C27.6918 12.1959 25.4418 9.94591 22.4995 9.94591Z"
                    fill="white"
                  />
                  <path
                    d="M38.9415 35.9073C38.4223 35.9073 38.0761 35.7343 37.73 35.3881C34.0953 31.4073 28.73 28.9843 23.1915 28.9843H21.6338C16.6146 28.9843 11.7684 30.8881 8.13379 34.5227C7.44148 35.215 6.22994 35.042 5.71071 34.3497C5.19148 33.6573 5.19148 32.792 5.71071 32.0996C10.0376 27.9458 15.7492 25.6958 21.6338 25.6958H23.1915C29.5953 25.6958 35.8261 28.465 40.153 33.1381C40.8453 33.8304 40.8453 34.8689 39.98 35.5612C39.8069 35.7343 39.4607 35.9073 38.9415 35.9073Z"
                    fill="white"
                  />
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
