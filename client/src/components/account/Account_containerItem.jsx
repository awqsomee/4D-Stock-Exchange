import React from 'react'

const Account_containerItem = (props) => {
  return (
    <div className="account_container">
      <div className="account__name">
        <div className="account_inf"></div>
        <div classname="account_userInf">Иван</div>
      </div>
      <div className="account__name">
        <div className="account_inf">Фамилия:</div>
        <div classname="account_userInf">Иванов</div>
      </div>
      <div className="account__name">
        <div className="account_inf">Дата рождения:</div>
        <div classname="account_userInf">12.12.1990</div>
      </div>
    </div>
  )
}

export default Account_containerItem
