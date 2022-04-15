import React, { useEffect, useState } from 'react'
import Less from '../../assets/Icons/DashCircle.svg'
import More from '../../assets/Icons/PlusCircle.svg'
import ArrowDown from '../../assets/Icons/angle_down.svg'
import ArrowUp from '../../assets/Icons/angle_up.svg'
import './stock.css'
import '../UI/buttons/buttons.css'
import Graph_panel from '../grahp-panel/Graph_panel'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../reducers/userReducer'
import axios from 'axios'
// const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
const serverAddress = 'http://localhost:5000'

const Stock = (props) => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.stock.quantity) setslashString('')
    else setslashString(`/${props.stock.quantity}`)
  }, [])

  const [counter, setCounter] = useState(1)
  const [slashString, setslashString] = useState('')
  const [GP, setGP] = useState(false)

  function less() {
    if (counter > 1) setCounter(counter - 1)
  }

  function more() {
    if (counter < props.stock.quantity || !props.stock.quantity) setCounter(counter + 1)
  }

  const buyStock = async (symbol, quantity) => {
    try {
      const response = await axios.post(
        `${serverAddress}/api/auth/stock`,
        { symbol, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        }
      )
      alert(response.data.message)
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  const sellStock = (id, quantity) => {
    return async (dispatch) => {
      try {
        const response = await axios.delete(`${serverAddress}/api/auth/stock/?id=${id}&quantity=${quantity}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('stonksToken')}` },
        })
        dispatch(setUser(response.data.user))
        alert(response.data.message)
      } catch (e) {
        alert(e.response.data.message)
      }
    }
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
        <div className="stock__change">{props.stock.changes}%</div>
        <div className="stock__counter">
          <div className="stock__counter__less">
            <button onClick={less} className="button__none">
              <img src={Less} alt="less_img" className="less_img"></img>{' '}
            </button>
          </div>
          <div className="count">
            {counter}
            {slashString}
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
            if (isAuth)
              switch (props.buttonText) {
                case 'Купить':
                  dispatch(buyStock(props.stock.symbol, counter))
                  break
                case 'Продать':
                  dispatch(sellStock(props.stock['_id'], counter))
                  break
              }
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
