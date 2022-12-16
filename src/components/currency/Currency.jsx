import React, { useEffect, useState } from 'react'
import './сurrency.css'
import Transactions from './transactions/transactions/Transactions'
import CurrencyList from './CurrencyList/CurrencyList'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import { useSelector } from 'react-redux'

const Currency = (props) => {
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  const alertStatus = useSelector((state) => state.toolkit.alertStatus)

  useEffect(() => {
    document.title = 'STONKS: Кошелек'
  }, [])

  useEffect(() => {
    if (modalBoxDeposit) {
      const timeId = setTimeout(() => {
        setmodalBoxDeposit(false)
      }, 1500)
      return () => {
        clearTimeout(timeId)
      }
    }
  }, [modalBoxDeposit])

  return (
    <div className="container2">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit} alertStatus={alertStatus}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <div className="title">{props.title}</div>
      <div className="currency">
        <div className="wallet">
          <CurrencyList setmodalBoxDeposit={setmodalBoxDeposit} />
        </div>
        <div className="transactios">
          <Transactions setmodalBoxDeposit={setmodalBoxDeposit}></Transactions>
        </div>
      </div>
    </div>
  )
}

export default Currency
