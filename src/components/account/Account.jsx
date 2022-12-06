import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import './account.css'
import Account_container from './Account_container.jsx'

const Account = (props) => {
  const [modalBoxDepositTrue, setmodalBoxDepositTrue] = useState(false)
  const [modalBoxDepositFalse, setmodalBoxDepositFalse] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)

  useEffect(() => {
    document.title = 'STONKS: Аккаунт'
  }, [])

  return (
    <div className="container2">
      <ModalBoxDeposit className="err" visible={modalBoxDepositFalse} setVisible={setmodalBoxDepositFalse}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className="ok" visible={modalBoxDepositTrue} setVisible={setmodalBoxDepositTrue}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <div className="title">{props.title}</div>
      <Account_container
        modalBoxDepositFalse={modalBoxDepositFalse}
        modalBoxDepositTrue={modalBoxDepositTrue}
        setmodalBoxDepositFalse={setmodalBoxDepositFalse}
        setmodalBoxDepositTrue={setmodalBoxDepositTrue}
      />
    </div>
  )
}

export default Account
