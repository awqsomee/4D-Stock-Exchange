import React, { useState } from 'react'
import './account.css'
import Account_containerItem from './Account_containerItem.jsx'

const Account = () => {
  const [value, setValue] = useState()

  return (
    
    <div className="account">
      <div className="header">Профиль</div>
      <Account_containerItem />
    </div>
  )
}

export default Account
