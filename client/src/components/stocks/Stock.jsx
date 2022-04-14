import React, { useContext, useState } from 'react'
import Less from '../../assets/Icons/DashCircle.svg'
import More from '../../assets/Icons/PlusCircle.svg'
import ArrowDown from '../../assets/Icons/angle_down.svg'
import ArrowUp from '../../assets/Icons/angle_up.svg'
import './stock.css'
import '../UI/buttons/buttons.css'
import Graph_panel from '../grahp-panel/Graph_panel'

const Stock = (props) => {
  // const isOpen = compareTime(stock)

  // const isAuth = useSelector((state) => state.user.isAuth)     ??
  const { isAuth, setIsAuth } = useContext

  const actionStock = (symbol, quantity) => {
    console.log('hi')
    props.actionStock(symbol, quantity)
  }

  let GP
  if (props.stock.number % 3 === 0) GP = true
  // const symbol = response.data['1. symbol']
  // const name = response.data['2. name']
  // const price = response.data[price]
  const [counter, setCounter] = useState(1)

  function less() {
    if (counter > 1) setCounter(counter - 1)
  }

  function more() {
    if (counter < props.stock.quantity) setCounter(counter - 1)
    setCounter(counter + 1)
  }

  return (
    <div>
      <div className="number">{props.stock.number}</div>
      <div className="stock">
        <div className="stock__index">{props.stock.symbol}</div>
        <div className="stock__name">{props.stock.name}</div>
        <div className="stock__cost">
          {props.stock.data[99].value.toFixed(2)} {props.stock.currency}
        </div>
        <div className="stock__change">+23%</div>
        <div className="stock__counter">
          <div className="stock__counter__less">
            <button onClick={less} className="button__none">
              <img src={Less} alt="less_img" className="less_img"></img>{' '}
            </button>
          </div>
          <div className="count">
            {counter}/{props.stock.quantity}
          </div>
          <div className="stock__counter__more">
            <button onClick={more} className="button__none">
              <img src={More} alt="more_img" className="more_img"></img>{' '}
            </button>
          </div>
        </div>
        <button
          className="button button__normal"
          onClick={() => {
            if (isAuth) props.dispatched(actionStock(props.stock.symbol, props.quantity))
            // else setModalLog(true)
          }}
        >
          {props.buttonText}
        </button>
        <button
          onClick={() => {
            if (GP) setGP(false)
            else setGP(true)
          }}
          className="stock__arrow"
        >
          {GP && <img src={ArrowDown} alt="arrowDown_img" className="arrowDown_img" />}
          {!GP && <img src={ArrowUp} alt="arrowUp_img" className="arrowUp_img" />}
        </button>
      </div>
      {GP && <Graph_panel stock={props.stock} />}
    </div>
  )
}

export default Stock
