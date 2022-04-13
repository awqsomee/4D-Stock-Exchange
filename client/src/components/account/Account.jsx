import React, { useState } from 'react'
import './account.css'
import Account_containerItem from './Account_containerItem'

function Account() {
  const [value, setValue] = useState()

  return (
    <div className="account">
      <Account_containerItem />
    </div>
  )
}

export default Account
