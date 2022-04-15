import React from 'react'
import './history.css'
import '../UI/buttons/buttons.css'

const History = (props) => {
  return (
    <div className="history">
      <div className="history__type">{props.history.type}</div>
      <div className="history__name">{props.history.symbol}</div>
      <div className="history__summ">{props.history.quantity}</div>
      <div className="history__price">
        {props.history.quantity &&
          `${new Intl.NumberFormat('ru-RU').format(Number(props.history.price) * Number(props.history.quantity))} ${
            props.history.currency
          }`}
        {!props.history.quantity &&
          `${new Intl.NumberFormat('ru-RU').format(Number(props.history.price))} ${props.history.currency}`}
      </div>
      <div className="history__date">{props.history.date.toLocaleString('en-US')}</div>
      {/* <div style={{ width: '30%', justifyContent: 'space-between' }}>
      </div> */}
    </div>
  )
}

export default History
