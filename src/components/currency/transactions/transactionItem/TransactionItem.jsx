import React from 'react'
import './transactionItem.css'

const TransactionItem = (props) => {
  const transactionItem = props.transactionItem
  const cost = transactionItem?.symbol
    ? transactionItem?.price * transactionItem?.amount
    : null
  return (
    <div className="transactionItem">
      <div className="transactionItem__type">{transactionItem?.type}</div>
      {transactionItem?.symbol ? (
        <div className="transactionItem__amount">
          {transactionItem?.amount} {transactionItem?.symbol}
        </div>
      ) : (
        <div> </div>
      )}
      <div className="transactionItem__price">{transactionItem?.price}</div>
      <div className="transactionItem__cost">
        {new Intl.NumberFormat('ru-RU').format(cost)}
      </div>
      <div className="transactionItem__date">
        {new Date(Date.parse(transactionItem?.date)).toLocaleDateString('ru', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })}
      </div>
    </div>
  )
}

export default TransactionItem
