import React from 'react'
import './transactionItem.css'

const TransactionItem = (props) => {
  const transactionItem = props.transactionItem
  return (
    <div className="transactionItem">
      <div>{transactionItem?.type}</div>
      {transactionItem?.symbol ? (
        <div>
          {transactionItem?.symbol}, ({transactionItem?.amount})
        </div>
      ) : null}
      <div>{transactionItem?.price}</div>
      <div>
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
