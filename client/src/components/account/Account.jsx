import React, { useState } from 'react'
import './account.css'
import Account_containerItem from './Account_containerItem'

function Account() {
  const [value, setValue] = useState()

  return (
    <div className="account">
      <div className="account__header"> Профиль</div>
      <Account_containerItem
        account_container={{
          name: 'Имя:',
          userName: 'Иван',
          surname: 'Фамилия:',
          userSurname: 'Иванов',
          date: 'Дата рождения:',
          userDate: '02.12.1987',
        }}
      />
      <Account_containerItem
        account_container={{
          name: 'E-mail:',
          userName: 'Ivanov@mail.ru',
          surname: 'Контактный номер:',
          userSurname: '8 (923) 123-45-67',
          date: 'Паспортные данные:',
          userDate: '01 23 456789',
        }}
      />
      <Account_containerItem
        account_container={{
          name: 'Платежная система:',
          userName: 'Visa',
          surname: 'Срок действия карты:',
          userSurname: '12/2024',
          date: 'Номер карты:',
          userDate: '**** **** **** 1234',
        }}
      />
      <button className="account__button">Редактировать</button>
    </div>
  )
}

export default Account
