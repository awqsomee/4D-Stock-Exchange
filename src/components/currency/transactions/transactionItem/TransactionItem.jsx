import { React, useState } from 'react'
import './transactionItem.css'

const TransactionItem = (props) => {
  const [isOverTime, setIsOverTime] = useState(false)
  const transactionItem = props.transactionItem
  const cost = transactionItem?.symbol ? transactionItem?.price * transactionItem?.amount : null
  return (
    <div className="transactionItem">
      <div className="transactionItem__type">{transactionItem?.type}</div>
      {transactionItem?.symbol ? (
        <div className="transactionItem__amount">
          {transactionItem?.amount} {transactionItem.symbol}
        </div>
      ) : (
        <div className="transactionItem__amount"> </div>
      )}
      {transactionItem?.price ? (
        <div className="transactionItem__price">{new Intl.NumberFormat('ru-RU').format(transactionItem.price)} RUB</div>
      ) : (
        <div className="transactionItem__price"> </div>
      )}
      {transactionItem?.cost ? (
        <div className="transactionItem__cost">{new Intl.NumberFormat('ru-RU').format(cost)} RUB</div>
      ) : (
        <div className="transactionItem__cost"> </div>
      )}
      <div
        className="transactionItem__date"
        onMouseEnter={() => setIsOverTime(true)}
        onMouseLeave={() => setIsOverTime(false)}
      >
        {isOverTime
          ? new Date(Date.parse(transactionItem?.date)).toLocaleTimeString('ru')
          : new Date(Date.parse(transactionItem?.date)).toLocaleDateString('ru', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
      </div>
    </div>
  )
}

export default TransactionItem
