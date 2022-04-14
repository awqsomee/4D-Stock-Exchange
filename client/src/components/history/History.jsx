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
      <div className="history__type">{props.history.type}</div>
      <div className="history__name">{props.history.name}</div>
      <div className="history__price">{props.history.price}</div>
      <div style={{ width: '30%', justifyContent: 'space-between' }}>
        <div className="history__summ">{props.history.summ}</div>
        <div className="history__date">{props.history.date}</div>
      </div>
    </div>
  )
}

export default History
