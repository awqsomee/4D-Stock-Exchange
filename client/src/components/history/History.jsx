import React from 'react'
import './history.css'
import '../UI/buttons/buttons.css'

const History = (props) => {
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]

  return (
      <div className="history">
        <div className="history__type">Покупка</div>
        <div className="history__name">Apple</div>
        <div className="history__summ">1 452 S</div>
        <div className="history__date">28.08.2088</div>
      </div>
  )
}

export default History