import React from 'react'
import './account.css'

const Account = () => {
  return (
    <div className="account">
      <div className="account__header"> Профиль</div>
      <div className="account_container">
        <div className="account__name"> Иконка</div>
        <div className="account__nameUser"> Иван Иванов </div>
      </div>

      <div className="account_container">
        <div className="account__name"> Имя: </div>
        <div className="account__nameUser"> Иван </div>
        <div className="account__name"> Фамилия: </div>
        <div className="account__nameUser"> Иванов </div>
        <div className="account__name"> Дата рождения: </div>
        <div className="account__nameUser"> 01.02.1999 </div>
      </div>

      <div className="account_container">
        <div className="account__name"> E-mail: </div>
        <div className="account__nameUser"> Ivanov@mail.ru </div>
        <div className="account__name"> Контактный номер: </div>
        <div className="account__nameUser"> 8 (923) 123-45-67 </div>
        <div className="account__name"> Паспортные данные: </div>
        <div className="account__nameUser"> 01 23 456789 </div>
      </div>

      <div className="account_container">
        <div className="account__name"> Платежная система: </div>
        <div className="account__nameUser"> Visa </div>
        <div className="account__name"> Срок действия карты: </div>
        <div className="account__nameUser"> 12/2024 </div>
        <div className="account__name"> Номер карты: </div>
        <div className="account__nameUser"> **** **** **** 1234 </div>
      </div>
    </div>
  )
}

export default Account
