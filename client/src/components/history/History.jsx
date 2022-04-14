import React from 'react'
import './history.css'
import '../UI/buttons/buttons.css'

const History = (props) => {
  // const type = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]
  // const summ = response.data[summ]
  // const date = response.data[date]

  return (
      <div className="history">
        <div className="history__type">{props.stock.type}</div>
        <div className="history__name">{props.stock.name}</div>
        <div className="history__price">{props.stock.price}</div>
        <div className="history__summ">{props.stock.summ}</div>
        <div className="history__date">{props.stock.date}</div>
      </div>
  )
}

export default History