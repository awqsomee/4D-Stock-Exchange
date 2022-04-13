import React from 'react'

const Account_containerItem = (props) => {
  return (
    <div className="account_container">
      <div className="account__name">
        <div>
          {props.account_container.name}
          <div className="account__userInf">{props.account_container.userName}</div>
        </div>
        <div>
          {props.account_container.surname}
          <div className="account__userInf">{props.account_container.userSurname}</div>
        </div>
        {props.account_container.date}
        <div className="account__userInf">{props.account_container.userDate}</div>
      </div>
    </div>
  )
}

export default Account_containerItem
