import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slice'
import Loader from '../UI/loader/Loader'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import './account.css'
import Account_container from './Account_container.jsx'

const Account = (props) => {
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  const alertStatus = useSelector((state) => state.toolkit.alertStatus)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'STONKS: Аккаунт'
  }, [])

  useEffect(() => {
    if (modalBoxDeposit) {
      const timeId = setTimeout(() => {
        if (alertMessage === 'Пользователь удален') dispatch(logout())
        setmodalBoxDeposit(false)
      }, 1500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [modalBoxDeposit])

  return (
    <div className="container2">
      <div
        onClick={() => {
          if (alertMessage === 'Пользователь удален') dispatch(logout())
        }}
      >
        <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit} alertStatus={alertStatus}>
          {isLoading ? <Loader /> : <div>{alertMessage}</div>}
        </ModalBoxDeposit>
      </div>

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
