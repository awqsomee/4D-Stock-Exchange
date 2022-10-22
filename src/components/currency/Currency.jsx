import React from 'react'
import Balance from './balance/Balance'
import './сurrency.css'
import Transactions from './transactions/transactions/Transactions'
import CurrencyList from './CurrencyList/CurrencyList'

const Currency = (props) => {
  return (
    <div className="container2">
      <Balance />
      <div className="title">{props.title}</div>
      <div className="currency">
        <div className="wallet">
          <CurrencyList />
          {/* <Wallet></Wallet> */}
        </div>
        <div className="transactios">
          <Transactions></Transactions>
        </div>
      </div>
    </div>
  )
}

export default Currency
