import React, { useContext, useEffect } from 'react'
import Less from '../../assets/Icons/DashCircle.svg'
import More from '../../assets/Icons/PlusCircle.svg'
import Arrow from '../../assets/Icons/angle_down.svg'
import './stock.css'
import '../UI/buttons/buttons.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import compareTime from '../../utils/compareTime'

const Stock = (props) => {
  // const isOpen = compareTime(stock)

  // const isAuth = useSelector((state) => state.user.isAuth)     ??
  const { isAuth, setIsAuth } = useContext
  const dispatch = useDispatch()

  return (
    <div>
      <div className="number">{props.stock.number}</div>
      <div className="stock">
        <div className="stock__index">{props.stock.symbol}</div>
        <div className="stock__name">{props.stock.name}</div>
        <div className="stock__cost">
          {props.stock.price} {props.stock.currency}
        </div>
        <div className="stock__change">+23%</div>
        <div className="stock__counter">
          <div className="stock__counter__less">
            <img src={Less} alt="less_img" className="less_img"></img>{' '}
          </div>
          <div className="count">1</div>
          <div className="stock__counter__more">
            <img src={More} alt="more_img" className="more_img"></img>{' '}
          </div>
        </div>
        <button
          className="button button__normal"
          onClick={() => {
            if (isAuth) dispatch(props.function(props.stock.symbol, props.quantity))
            // else setModalLog(true)
          }}
        >
          Купить
        </button>
        <div className="stock__arrow">
          <img src={Arrow} alt="arrow_img" className="arrow_img" />
        </div>
      </div>
    </div>
  )
}

export default Stock
