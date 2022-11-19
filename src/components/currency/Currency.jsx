import React, { useState } from 'react'
import Balance from './balance/Balance'
import './сurrency.css'
import Transactions from './transactions/transactions/Transactions'
import CurrencyList from './CurrencyList/CurrencyList'
import ModalBoxDeposit from '../UI/ModalBox/ModalBoxDeposit'

const Currency = (props) => {
  const [modalBoxDepositOpenTrue, setmodalBoxDepositOpenTrue] = useState(false)
  const [modalBoxDepositOpenFalse, setmodalBoxDepositOpenFalse] = useState(false)
  const [modalBoxDepositCloseTrue, setmodalBoxDepositCloseTrue] = useState(false)
  const [modalBoxDepositCloseFalse, setmodalBoxDepositCloseFalse] = useState(false)
  return (
    <div className="container2">
      <ModalBoxDeposit className={'err'} visible={modalBoxDepositOpenFalse} setVisible={setmodalBoxDepositOpenFalse}>
        <div>Не удалось открыть счет</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className={'ok'} visible={modalBoxDepositOpenTrue} setVisible={setmodalBoxDepositOpenTrue}>
        <div>Счет успешно открыт</div>
      </ModalBoxDeposit>

      <ModalBoxDeposit className={'err'} visible={modalBoxDepositCloseFalse} setVisible={setmodalBoxDepositCloseFalse}>
        <div>Не удалось закрыть счет</div>
      </ModalBoxDeposit>
      <ModalBoxDeposit className={'ok'} visible={modalBoxDepositCloseTrue} setVisible={setmodalBoxDepositCloseTrue}>
        <div>Счет успешно закрыт. Все средства были переведены в рубли и уже поступили на ваш счет</div>
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
