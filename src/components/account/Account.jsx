import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../UI/loader/Loader'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import './account.css'
import Account_container from './Account_container.jsx'

const Account = (props) => {
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  const alertStatus = useSelector((state) => state.toolkit.alertStatus)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    document.title = 'STONKS: Аккаунт'
  }, [])

  return (
    <div className="container2">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit} alertStatus={alertStatus}>
        {isLoading ? <Loader /> : <div>{alertMessage}</div>}
      </ModalBoxDeposit>

      <div className="title">{props.title}</div>
      <Account_container
        modalBoxDeposit={modalBoxDeposit}
        setmodalBoxDeposit={setmodalBoxDeposit}
        setIsLoading={setIsLoading}
      />
    </div>
  )
}

export default Account
