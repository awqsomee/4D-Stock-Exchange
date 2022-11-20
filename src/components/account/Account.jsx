import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import './account.css'
import Account_containerItem from './Account_containerItem.jsx'

const Account = (props) => {
  const [modalBoxDepositTrue, setmodalBoxDepositTrue] = useState(false)
  const [modalBoxDepositFalse, setmodalBoxDepositFalse] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)

  return (
    <div className="container2">
      <ModalBoxDeposit className="err" visible={modalBoxDepositFalse} setVisible={setmodalBoxDepositFalse}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className="ok" visible={modalBoxDepositTrue} setVisible={setmodalBoxDepositTrue}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <div className="title">{props.title}</div>
      <Account_containerItem
        modalBoxDepositFalse={modalBoxDepositFalse}
        modalBoxDepositTrue={modalBoxDepositTrue}
        setmodalBoxDepositFalse={setmodalBoxDepositFalse}
        setmodalBoxDepositTrue={setmodalBoxDepositTrue}
      />
    </div>
  )
}

export default Account
