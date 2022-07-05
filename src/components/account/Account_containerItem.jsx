import React from 'react'
import { setUser } from '../../reducers/userReducer'
import './account.css'
import { store } from '../../reducers/index'

const Account_containerItem = (props) => {
  const user = store.getState(setUser).user.currentUser
  const UserPhone = '8(999)123-45-67'
  const UserDate = '12.12.1990'
  return (
    <div className="account_container">
      <div className="account_inf">Имя</div>
      <div className="account_userInf">{user.name}</div>

      <div className="account_inf">Фамилия</div>
      <div className="account_userInf">{user.surname}</div>

      <div className="account_inf">Электронная почта</div>
      <div className="account_userInf">{user.email}</div>

      <div className="account_inf">Номер телефона</div>
      <div className="account_userInf">{UserPhone}</div>

      <div className="account_inf">Дата рождения</div>
      <div className="account_userInf">{UserDate}</div>
    </div>
  )
}

export default Account_containerItem
