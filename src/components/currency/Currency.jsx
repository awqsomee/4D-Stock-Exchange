import React, { useState } from 'react'
import Balance from './balance/Balance'
import './сurrency.css'
import Transactions from './transactions/transactions/Transactions'
import CurrencyList from './CurrencyList/CurrencyList'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'
import { useSelector } from 'react-redux'

const Currency = (props) => {
  const [modalBoxDepositOpenTrue, setmodalBoxDepositOpenTrue] = useState(false)
  const [modalBoxDepositOpenFalse, setmodalBoxDepositOpenFalse] = useState(false)
  const [modalBoxDepositCloseTrue, setmodalBoxDepositCloseTrue] = useState(false)
  const [modalBoxDepositCloseFalse, setmodalBoxDepositCloseFalse] = useState(false)
  const alertMessage = useSelector((state) => state.toolkit.alertMessage)
  return (
    <div className="container2">
      <ModalBoxDeposit className="err" visible={modalBoxDepositOpenFalse} setVisible={setmodalBoxDepositOpenFalse}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className="ok" visible={modalBoxDepositOpenTrue} setVisible={setmodalBoxDepositOpenTrue}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className="err" visible={modalBoxDepositCloseFalse} setVisible={setmodalBoxDepositCloseFalse}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className="ok" visible={modalBoxDepositCloseTrue} setVisible={setmodalBoxDepositCloseTrue}>
        <div>{alertMessage}</div>
      </ModalBoxDeposit>

      <div className="title">{props.title}</div>
      <div className="currency">
        <div className="wallet">
          <CurrencyList
            modalBoxDepositFalse={modalBoxDepositOpenFalse}
            modalBoxDepositTrue={modalBoxDepositOpenTrue}
            setmodalBoxDepositFalse={setmodalBoxDepositOpenFalse}
            setmodalBoxDepositTrue={setmodalBoxDepositOpenTrue}
          />
        </div>
        <div className="transactios">
          <Transactions
            modalBoxDepositFalse={modalBoxDepositCloseFalse}
            modalBoxDepositTrue={modalBoxDepositCloseTrue}
            setmodalBoxDepositFalse={setmodalBoxDepositCloseFalse}
            setmodalBoxDepositTrue={setmodalBoxDepositCloseTrue}
          ></Transactions>
        </div>
      </div>
    </div>
  )
}

export default Currency
