import React, { useState } from 'react'
import './account.css'
import Account_containerItem from './Account_containerItem.jsx'

const Account = (props) => {
  return (
    <div className="container2">
      <div className="title">{props.title}</div>
      <Account_containerItem />
    </div>
  )
}

export default Account
