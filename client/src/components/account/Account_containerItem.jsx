import React from 'react'
import './account.css'

const Account_containerItem = (props) => {
  const UserName = 'Иван';
  const UserSurname = 'Иванов';
  const UserEmail = 'ivanov@email.com';
  const UserPhone = '8(999)123-45-67';
  const UserDate = '12.12.1990';
  return (
    <div className="account_container">
    
        <div className="account_inf">Имя</div>
        <div classname="account_userInf">{UserName}</div>

        <div className="account_inf">Фамилия</div>
        <div classname="account_userInf">{UserSurname}</div>

        <div className="account_inf">Электронная почта</div>
        <div classname="account_userInf">{UserEmail}</div>

        <div className="account_inf">Номер телефона</div>
        <div classname="account_userInf">{UserPhone}</div>

        <div className="account_inf">Дата рождения</div>
        <div classname="account_userInf">{UserDate}</div>

    </div>
  )
}

export default Account_containerItem
