import React, { useEffect, useState } from 'react'
import Less from '../../assets/Icons/DashCircle.svg'
import More from '../../assets/Icons/PlusCircle.svg'
import ArrowDown from '../../assets/Icons/angle_down.svg'
import ArrowUp from '../../assets/Icons/angle_up.svg'
import './stock.css'
import '../UI/buttons/buttons.css'
import Graph_panel from '../grahp-panel/Graph_panel'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/slice'
const serverAddress = 'https://gentle-sea-62964.herokuapp.com'
// const serverAddress = 'http://localhost:5000'

const Stock = (props) => {
  const isAuth = useSelector((state) => state.toolkit.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!props.stock.quantity) setslashString('')
    else setslashString(`/${props.stock.quantity}`)
  }, [])

  const [counter, setCounter] = useState(0)
  const [slashString, setslashString] = useState('')
  const [GP, setGP] = useState(false)
  const [mouse, setMouse] = useState(false)
  const [buttBuy, setButtBuy] = useState('button stock__button button__normal')

  function less() {
    if (counter > 0) setCounter(counter - 1)
    if (counter == 1) setButtBuy('button stock__button button__normal')
  }

  function more() {
    if (counter < props.stock.quantity || !props.stock.quantity)
      setCounter(counter + 1)
  }

  const buyStock = async (symbol, quantity) => {
    try {
      const response = await axios.post(
        `${serverAddress}/api/auth/stock`,
        { symbol, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
          },
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
        const response = await axios.delete(
          `${serverAddress}/api/auth/stock/?id=${id}&quantity=${quantity}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('stonksToken')}`,
            },
          }
        )
        dispatch(setUser(response.data.user))
        alert(response.data.message)
      } catch (e) {
        alert(e.response.data.message)
      }
    }
  }

  return (
    <div>
      <div className="stock">
        <div className="stock__index">{props.stock.symbol}</div>
        <div className="stock__name">{props.stock.name}</div>
        <div className="stock__cost">
          {props.stock?.data ? (
            <div>
              {props.stock.data[99].value.toFixed(2)} {props.stock.currency}
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
        <div className="stock__change">{props.stock.changes}%</div>

        {buttBuy === 'button stock__button button__process' ? (
          <div className="stock__counter">
            <button
              className="button__none stock__counter__less"
              onClick={less}
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75 11.5C5.75 11.3094 5.82573 11.1266 5.96052 10.9918C6.09531 10.857 6.27813 10.7812 6.46875 10.7812H16.5312C16.7219 10.7812 16.9047 10.857 17.0395 10.9918C17.1743 11.1266 17.25 11.3094 17.25 11.5C17.25 11.6906 17.1743 11.8734 17.0395 12.0082C16.9047 12.143 16.7219 12.2188 16.5312 12.2188H6.46875C6.27813 12.2188 6.09531 12.143 5.96052 12.0082C5.82573 11.8734 5.75 11.6906 5.75 11.5Z"
                  fill="white"
                />
              </svg>
            </button>
            <div className="count">
              {counter}
              {slashString}
            </div>
            <button onClick={more} className="button__none">
              <svg
                width="23"
                height="23"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stock__counter__more"
              >
                <path
                  d="M11.5 5.75C11.6906 5.75 11.8734 5.82573 12.0082 5.96052C12.143 6.09531 12.2188 6.27813 12.2188 6.46875V10.7812H16.5312C16.7219 10.7812 16.9047 10.857 17.0395 10.9918C17.1743 11.1266 17.25 11.3094 17.25 11.5C17.25 11.6906 17.1743 11.8734 17.0395 12.0082C16.9047 12.143 16.7219 12.2188 16.5312 12.2188H12.2188V16.5312C12.2188 16.7219 12.143 16.9047 12.0082 17.0395C11.8734 17.1743 11.6906 17.25 11.5 17.25C11.3094 17.25 11.1266 17.1743 10.9918 17.0395C10.857 16.9047 10.7812 16.7219 10.7812 16.5312V12.2188H6.46875C6.27813 12.2188 6.09531 12.143 5.96052 12.0082C5.82573 11.8734 5.75 11.6906 5.75 11.5C5.75 11.3094 5.82573 11.1266 5.96052 10.9918C6.09531 10.857 6.27813 10.7812 6.46875 10.7812H10.7812V6.46875C10.7812 6.27813 10.857 6.09531 10.9918 5.96052C11.1266 5.82573 11.3094 5.75 11.5 5.75Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        ) : null}
        <button
          className={buttBuy}
          onClick={() => {
            if (buttBuy === 'button stock__button button__normal') setCounter(1)
            setButtBuy('button stock__button button__process')
            if (isAuth)
              switch (props.buttonText) {
                case 'Купить':
                  // dispatch(buyStock(props.stock.symbol, counter))
                  break
                case 'Продать':
                  // dispatch(sellStock(props.stock['_id'], counter))
                  break
              }
          }}
        >
          {counter == 0
            ? 'Купить'
            : `${(props.stock.data[99].value * counter).toFixed(2)} ${
                props.stock.currency
              }`}
        </button>
        <button
          onClick={() => {
            if (GP) setGP(false)
            else setGP(true)
          }}
          className="stock__arrow"
        >
          {GP && (
            <img
              src={ArrowDown}
              alt="arrowDown_img"
              className="arrowDown_img"
            />
          )}
          {!GP && (
            <img src={ArrowUp} alt="arrowUp_img" className="arrowUp_img" />
          )}
        </button>
      </div>
      {GP && <Graph_panel stock={props.stock} />}
    </div>
  )
}

export default Stock
