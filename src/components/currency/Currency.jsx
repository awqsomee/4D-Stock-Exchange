import React, { useEffect, useState } from 'react'
import Balance from './balance/Balance'
import './сurrency.css'
import Transactions from './transactions/transactions/Transactions'
import CurrencyList from './CurrencyList/CurrencyList'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import { useSelector } from 'react-redux'

const Currency = (props) => {
  const [modalBoxDeposit, setmodalBoxDeposit] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)

  useEffect(() => {
    document.title = 'STONKS: Кошелек'
  }, [])

  return (
    <div className="container2">
      <ModalBoxDeposit visible={modalBoxDeposit} setVisible={setmodalBoxDeposit}>
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
