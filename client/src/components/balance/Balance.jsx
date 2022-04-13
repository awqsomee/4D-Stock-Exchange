import React from 'react'
import '../UI/buttons/buttons.css'
import "./balance.css"
import "../UI/input/input.css"

const Balance = (props) => {
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]

  return (
      <div className="balance">
        <div className="balance__summ">1000 P</div>
        <input className="search balance__input"></input>
        <button className="balance__button button button__normal">Пополнить</button>
      </div>
  )
}

export default Balance