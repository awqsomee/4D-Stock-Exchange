import React from 'react'
import './transactionItem.css'

const TransactionItem = (props) => {
  const transactionItem = props.currencyItem
  return (
    <div className="transactionItem">
      <div>Покупка</div>
      <div>Apple</div>
      <div>1000</div>
      <div>18.07.2022</div>
    </div>
  )
}

export default TransactionItem
